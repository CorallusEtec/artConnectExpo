export type FaqItem = {
  pergunta: string;
  resposta: string;
  categoria: string;
};

export const FAQ_DATA: FaqItem[] = [
  // Conta
  {
    categoria: "Conta",
    pergunta: "Como faço para trocar de conta?",
    resposta:
      "Na engrenagem de configurações no topo da tela, toque em 'Sair'. Em seguida, faça login com a conta desejada.",
  },
  {
    categoria: "Conta",
    pergunta: "Como edito as informações do meu perfil?",
    resposta:
      "Acesse a aba Perfil e toque em 'Editar perfil'. Lá você pode alterar foto, nome, biografia, contatos e gêneros artísticos.",
  },

  // Artistas e Contratantes
  {
    categoria: "Artistas e Contratantes",
    pergunta: "Qual é a diferença entre conta Artista e conta Contratante?",
    resposta:
      "Artistas divulgam seu trabalho, portfólio e informações de contato. Contratantes buscam artistas para contratar e podem entrar em contato diretamente pelo app.",
  },
  {
    categoria: "Artistas e Contratantes",
    pergunta: "Como entro em contato com um artista?",
    resposta:
      "Acesse o perfil do artista e toque no ícone de mensagem no canto superior direito para iniciar uma conversa pelo chat.",
  },
  {
    categoria: "Artistas e Contratantes",
    pergunta: "Como sigo um perfil?",
    resposta:
      "Entre no perfil do usuário que deseja seguir e toque no botão 'Seguir'. Para deixar de seguir, toque novamente no mesmo botão.",
  },

  // Publicações
  {
    categoria: "Publicações",
    pergunta: "Como faço uma publicação?",
    resposta:
      "Toque no botão '+' na barra de navegação inferior. Adicione uma foto ou vídeo, escreva uma descrição e toque em 'Publicar'.",
  },
  {
    categoria: "Publicações",
    pergunta: "Como comento em uma publicação?",
    resposta:
      "Toque no ícone de comentário abaixo da publicação, escreva seu comentário e toque em 'Enviar'.",
  },

  // Segurança e Privacidade
  {
    categoria: "Segurança e Privacidade",
    pergunta: "Meus dados estão seguros?",
    resposta:
      "Sim. Utilizamos criptografia para proteger seus dados. Nunca compartilhamos suas informações pessoais com terceiros sem seu consentimento.",
  },
  {
    categoria: "Segurança e Privacidade",
    pergunta: "Como reporto um perfil ou conteúdo impróprio?",
    resposta:
      "Toque no menu (três pontos) do perfil ou publicação e selecione 'Denunciar'. Nossa equipe analisará o caso.",
  },

  // Suporte
  {
    categoria: "Suporte",
    pergunta: "Como entro em contato com o suporte?",
    resposta:
      "Envie um e-mail para suporte@artconnect.com.br ou acesse a seção 'Fale Conosco' nas configurações do app.",
  },
];

/** Retorna as categorias únicas na ordem em que aparecem */
export function getFaqCategorias(): string[] {
  return [...new Set(FAQ_DATA.map((item) => item.categoria))];
}

/** Retorna apenas os itens de uma categoria */
export function getFaqPorCategoria(categoria: string): FaqItem[] {
  return FAQ_DATA.filter((item) => item.categoria === categoria);
}