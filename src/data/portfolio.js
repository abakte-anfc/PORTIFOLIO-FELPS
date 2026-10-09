// Edite este arquivo para personalizar o portfólio.
// Coloque os vídeos em public/videos e use caminhos como /videos/projeto.mp4.
// Sem arquivo configurado, o site exibe um espaço reservado, sem player quebrado.
export const palette = { blue: "#2c5568", cream: "#eee8d2" };

export const pages = [
  { id: "cover", label: "Início" },
  { id: "contents", label: "Projetos" },
  { id: "work", label: "Nosso universo" },
  { id: "about", label: "Sobre" },
  { id: "contact", label: "Contato" },
];

const video = (id, title, src = "") => ({
  id,
  title,
  src,
  poster: "",
  description: "",
});

export const portfolio = {
  name: "Felipe Godinho",
  handle: "",
  year: "2026",
  role: "Editor de vídeo",
  hero: {
    eyebrow: "CRIATIVIDADE E ESTRATÉGIA. HÁ 6 ANOS.",
    lines: ["Vídeos que", "prendem.", "Sua atenção."],
    description:
      "A diferença entre vídeos que prendem e vídeos que passam despercebidos.",
    media: { src: "", poster: "", title: "Apresentação do portfólio" },
  },
  chapters: [
    {
      id: "selected",
      title: "Projetos selecionados",
      tab: "01 / Seleção",
      points: ["Projetos", "Histórias", "Vídeos"],
      videos: [
        video("selected-1", "IA", "/videos/ia.mp4"),
        video("selected-2", "O diferencial está na sua história", "/videos/o-diferencial-esta-na-sua-historia.mp4"),
      ],
    },
    {
      id: "motion",
      title: "Conteúdo em movimento",
      tab: "02 / Movimento",
      points: ["Criação", "Narrativa", "Detalhes"],
      videos: [video("motion-1", "Pôster animado — Homem-Aranha", "/videos/poster-animado-homem-aranha.mp4"), video("motion-2", "Reels Leandro", "/videos/reels-leandro.mp4")],
    },
    {
      id: "experiments",
      title: "Ideias & experimentos",
      tab: "03 / Experimentos",
      points: ["Processo", "Exploração", "Novos caminhos"],
      videos: [
        video("experiment-1", "Propaganda Guaraná", "/videos/propaganda-guarana.mp4"),
        video("experiment-2", "Tomba Caixa", "/videos/tomba-caixa.mp4"),
      ],
    },
  ],
  universe: {
    title: ["Tem detalhe.", "Tem personalidade."],
    description:
      "A diferença não está só no conteúdo, está naquilo diante dos nossos olhos.\n\nVídeos que prendem a atenção seguem uma ciência específica que faz o público ficar grudado na tela.",
    videos: [
      video("universe-1", "Coloração", "/videos/coloracao.mp4"),
      video("universe-2", "Dr. Bernardo — Resgate da autoestima", "/videos/dr-bernardo-resgate-da-autoestima.mp4"),
      video("universe-3", "Vídeo legalzão", "/videos/video-legalzao.mp4"),
    ],
  },
  about: {
    greeting: "Olá, eu sou",
    description:
      "Sou Felipe Godinho, editor de vídeo profissional há 6 anos, especialista em transformar ideias em conteúdo dinâmico e envolvente. Domino técnicas criativas para reels e vídeos curtos que prendem a atenção, geram engajamento e comunicam sua mensagem de forma marcante. Meu foco é unir criatividade e estratégia para entregar resultados que se destacam nas redes sociais.",
    photo: "/images/cabeca-padrao.png",
    photoHover: "/images/cabecinha-ain.png",
    highlights: [],
    timeline: [],
  },
  contact: {
    email: "",
    heading: "Fale comigo",
    message:
      "Imagine seus vídeos não só sendo assistidos completamente, mas fortalecendo sua autoridade e posicionando você como referência no seu nicho.\n\nFale comigo agora mesmo e eleve sua autoridade na internet com vídeos que prendem no primeiro segundo.",
    links: [], // { label: 'Instagram', value: '@seuusuario', href: 'https://...' }
  },
};
