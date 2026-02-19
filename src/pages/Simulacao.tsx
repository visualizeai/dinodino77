import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Produto = "pessoal" | "consignado" | "pj";

type FormState = {
  produto: Produto;
  valor: number;
  prazo: number;
  nome: string;
  telefone: string;
  email: string;
  consent: boolean;
};

const stepAnim = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.32 } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.22 } }
};

function produtoLabel(p: Produto) {
  if (p === "pessoal") return "Empréstimo Pessoal";
  if (p === "consignado") return "Consignado";
  return "Capital de Giro (PJ)";
}

export default function Simulacao() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<FormState>({
    produto: "pessoal",
    valor: 10000,
    prazo: 24,
    nome: "",
    telefone: "",
    email: "",
    consent: false
  });

  const resumo = useMemo(() => {
    return {
      produto: produtoLabel(data.produto),
      valor: `R$ ${data.valor.toLocaleString("pt-BR")}`,
      prazo: `${data.prazo} meses`
    };
  }, [data.produto, data.valor, data.prazo]);

  function next() {
    setStep((s) => (s === 1 ? 2 : s === 2 ? 3 : 3));
  }
  function back() {
    setStep((s) => (s === 3 ? 2 : s === 2 ? 1 : 1));
  }

  async function submit() {
    if (!data.consent) return;
    // MVP: sem backend. Em produção: POST /api/leads
    alert("Simulação enviada! Em breve a VerCred entrará em contato.");
  }

  const progress = step === 1 ? 33.33 : step === 2 ? 66.66 : 100;

  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Voltar para Home">
            <div className="logo" />
            <span>VerCred</span>
          </Link>
          <Link to="/" className="btn btn-outline">Voltar</Link>
        </div>
      </header>

      <main className="container">
        <div className="grid-3">
          <section className="form">
            <div className="form-top">
              <h1 style={{ margin: 0, fontSize: 18, letterSpacing: "-.02em" }}>Simulação</h1>
              <div style={{ fontSize: 12, color: "var(--muted2)" }}>Etapa {step}/3</div>
            </div>

            <div className="progress" aria-label="Progresso">
              <div style={{ width: `${progress}%` }} />
            </div>

            <div style={{ marginTop: 14 }}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" {...stepAnim}>
                    <div className="field">
                      <label className="label">Produto</label>
                      <select
                        className="select"
                        value={data.produto}
                        onChange={(e) => setData({ ...data, produto: e.target.value as Produto })}
                      >
                        <option value="pessoal">Empréstimo Pessoal</option>
                        <option value="consignado">Consignado</option>
                        <option value="pj">Capital de Giro (PJ)</option>
                      </select>
                    </div>

                    <div className="two">
                      <div className="field">
                        <label className="label">Valor (R$)</label>
                        <input
                          className="input"
                          type="number"
                          min={500}
                          step={100}
                          value={data.valor}
                          onChange={(e) => setData({ ...data, valor: Number(e.target.value) })}
                        />
                      </div>
                      <div className="field">
                        <label className="label">Prazo (meses)</label>
                        <input
                          className="input"
                          type="number"
                          min={3}
                          max={60}
                          value={data.prazo}
                          onChange={(e) => setData({ ...data, prazo: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="note">
                      Dica: a simulação é rápida e não garante aprovação. As condições finais dependem de análise.
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" {...stepAnim}>
                    <div className="note">
                      Para seguir, precisamos de dados básicos para contato e retorno da proposta.
                    </div>

                    <div className="two">
                      <div className="field">
                        <label className="label">Nome</label>
                        <input
                          className="input"
                          value={data.nome}
                          onChange={(e) => setData({ ...data, nome: e.target.value })}
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="field">
                        <label className="label">Telefone</label>
                        <input
                          className="input"
                          value={data.telefone}
                          onChange={(e) => setData({ ...data, telefone: e.target.value })}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">E-mail</label>
                      <input
                        className="input"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        placeholder="voce@exemplo.com"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" {...stepAnim}>
                    <div className="review">
                      <b>Revisão</b>
                      <p>
                        Produto: <span style={{ color: "#fff" }}>{resumo.produto}</span>
                        <br />
                        Valor: <span style={{ color: "#fff" }}>{resumo.valor}</span>
                        <br />
                        Prazo: <span style={{ color: "#fff" }}>{resumo.prazo}</span>
                      </p>
                    </div>

                    <label className="checkbox">
                      <input
                        type="checkbox"
                        checked={data.consent}
                        onChange={(e) => setData({ ...data, consent: e.target.checked })}
                        style={{ marginTop: 2 }}
                      />
                      <span>
                        Concordo com o uso dos meus dados para retorno da simulação, conforme a LGPD.
                      </span>
                    </label>

                    <button className="btn btn-emerald" style={{ width: "100%", marginTop: 12 }} disabled={!data.consent} onClick={submit}>
                      Enviar simulação
                    </button>

                    <p style={{ marginTop: 10, fontSize: 11, color: "var(--muted)" }}>
                      Sujeito à análise de crédito. Esta simulação não garante aprovação.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="form-actions">
              <button className="btn btn-outline" onClick={back} disabled={step === 1}>
                Voltar
              </button>
              <button className="btn btn-primary" onClick={next} disabled={step === 3}>
                Avançar
              </button>
            </div>
          </section>

          <aside className="aside">
            <h3>Resumo</h3>
            <div className="kv">
              <div><span>Produto:</span> {resumo.produto}</div>
              <div><span>Valor:</span> {resumo.valor}</div>
              <div><span>Prazo:</span> {resumo.prazo}</div>
            </div>

            <a
              className="btn btn-outline"
              style={{ width: "100%", marginTop: 14 }}
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noreferrer"
            >
              Tirar dúvidas no WhatsApp
            </a>
          </aside>
        </div>
      </main>
    </div>
  );
}
