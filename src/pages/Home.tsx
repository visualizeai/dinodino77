import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d }
  })
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="VerCred">
            <div className="logo" />
            <span>VerCred</span>
          </Link>

          <nav className="nav" aria-label="Navegação">
            <a href="#produtos" onClick={(e) => (e.preventDefault(), scrollToId("produtos"))}>Produtos</a>
            <a href="#como" onClick={(e) => (e.preventDefault(), scrollToId("como"))}>Como funciona</a>
            <a href="#faq" onClick={(e) => (e.preventDefault(), scrollToId("faq"))}>Dúvidas</a>
            <Link to="/simulacao">Simulação</Link>
          </nav>

          <div className="actions">
            <a className="btn btn-outline" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <Link className="btn btn-primary" to="/simulacao">
              Simular agora
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.05} className="badge">
                Transparência • Segurança • Agilidade
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={0.12} className="h1">
                Crédito com clareza, rapidez e segurança.
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0.18} className="p">
                Simule em poucos passos e receba uma proposta personalizada. Sem promessas irreais:
                aqui você entende taxas, prazos e condições antes de avançar.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.24} className="hero-cta">
                <Link className="btn btn-primary" to="/simulacao">Simular agora</Link>
                <a className="btn btn-outline" href="#como" onClick={(e) => (e.preventDefault(), scrollToId("como"))}>
                  Como funciona
                </a>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.3} className="trust">
                <div className="trust-card">
                  <b>Dados protegidos</b>
                  <span>Boas práticas e coleta mínima.</span>
                </div>
                <div className="trust-card">
                  <b>Taxas claras</b>
                  <span>Sem letras miúdas.</span>
                </div>
                <div className="trust-card">
                  <b>Atendimento humano</b>
                  <span>Suporte em horário comercial.</span>
                </div>
              </motion.div>
            </div>

            <motion.aside
              className="panel"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              <small>Prévia de simulação</small>
              <h3>R$ 10.000</h3>
              <p>em até 24x • análise rápida</p>

              <div className="feature-list">
                {["Prazo flexível", "Proposta personalizada", "Acompanhamento"].map((t, i) => (
                  <motion.div
                    key={t}
                    className="feature-item"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    <b>{t}</b>
                    <span>
                      {i === 0
                        ? "Escolha parcelas que cabem no seu bolso."
                        : i === 1
                          ? "Condições conforme perfil e produto."
                          : "Você sabe em que etapa está."}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Link className="btn btn-emerald" style={{ width: "100%", marginTop: 14 }} to="/simulacao">
                Iniciar simulação
              </Link>
              <p style={{ marginTop: 10, textAlign: "center", fontSize: 11, color: "var(--muted)" }}>
                Sujeito à análise de crédito. Exemplo ilustrativo.
              </p>
            </motion.aside>
          </div>
        </section>

        <section id="produtos" className="section">
          <div className="container">
            <motion.h2
              className="h2"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45 }}
            >
              Produtos VerCred
            </motion.h2>

            <div className="cards">
              {[
                ["Empréstimo Pessoal", "Para organizar a vida financeira com parcelas previsíveis."],
                ["Consignado", "Condições competitivas para quem tem margem consignável."],
                ["Capital de Giro (PJ)", "Fôlego para o caixa da empresa com análise objetiva."],
              ].map(([t, s]) => (
                <motion.div
                  key={t}
                  className="card"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <h4>{t}</h4>
                  <p>{s}</p>
                  <Link to="/simulacao">Simular →</Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="como" className="section alt">
          <div className="container">
            <h2 className="h2">Como funciona</h2>
            <div className="cards" style={{ marginTop: 16 }}>
              {[
                ["1) Simule", "Informe valor, prazo e tipo de crédito."],
                ["2) Envie seus dados", "Coletamos apenas o necessário, com consentimento."],
                ["3) Receba a proposta", "Você avalia condições antes de contratar."],
              ].map(([t, s], idx) => (
                <motion.div
                  key={t}
                  className="card"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                >
                  <h4 style={{ fontSize: 14 }}>{t}</h4>
                  <p>{s}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <h2 className="h2">Dúvidas frequentes</h2>
            <div className="faq">
              {[
                ["A simulação garante aprovação?", "Não. A aprovação depende de análise de crédito e políticas do produto."],
                ["Quais documentos são necessários?", "Em geral: documento com foto, comprovante e informações de renda/faturamento."],
                ["Em quanto tempo recebo retorno?", "Normalmente no mesmo dia útil, conforme volume e completude dos dados."],
                ["Meus dados estão seguros?", "Aplicamos boas práticas e coletamos apenas o necessário, com base na LGPD."],
              ].map(([q, a]) => (
                <div key={q} className="faq-item">
                  <b>{q}</b>
                  <p>{a}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn btn-primary" to="/simulacao">Pronto para simular?</Link>
              <a className="btn btn-outline" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="footer-row">
              <div>© {year} VerCred. Todos os direitos reservados.</div>
              <div style={{ color: "var(--muted)" }}>Sujeito à análise de crédito. LGPD • Termos • Privacidade</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
