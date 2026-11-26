import { CoupleProfile, LoveReason, MemoryPhoto, TimelineMilestone } from '../types';

import pinkLilyImg from '../assets/images/pink_lily_flower_1789098614817.jpg';
import pinkVinylImg from '../assets/images/pink_vinyl_lily_1789098629427.jpg';
import blueFlowersImg from '../assets/images/blue_flowers_1787609761239.jpg';
import singleFlowerImg from '../assets/images/single_flower_1787609772452.jpg';
import pinkFlowersEmblemImg from '../assets/images/pink_flowers_emblem_1789099609601.jpg';
import pinkFlowerBloomImg from '../assets/images/pink_flower_bloom_1789099620864.jpg';

const PHOTO_COUPLE_SKATE_COUCH = '/assets/aistudio/IMG_1756_0cb49174.JPG';
const PHOTO_SELFIE_KISS = '/assets/aistudio/1000096089_0969692b.jpg';
const PHOTO_GLOSS_CLASSROOM = '/assets/aistudio/c5cdcfee-22b5-4cbe-a7a5-5105f6f3b34e_473f4063.JPG';
const PHOTO_NIGHT_TREE = '/assets/aistudio/IMG_0788_59f0dc71.jpg';
const PHOTO_COUCH_COZY = '/assets/aistudio/IMG_0959_58cdf8ee.JPG';
const PHOTO_RESTAURANT = '/assets/aistudio/IMG_1043_761fc2d9.JPEG';
const PHOTO_BLACK_CAT = '/assets/aistudio/IMG_0927_7690efe9.jpg';
const PHOTO_MALL_SMILE = '/assets/aistudio/IMG_1735_8c06307b.jpg';

export const initialProfile: CoupleProfile = {
  partnerName: "Rayssa",
  userName: "Gustavo",
  startDate: "2023-09-12",
  songTitle: "Baby Be Mine",
  songArtist: "Michael Jackson",
  spotifyUrl: "https://open.spotify.com/intl-pt/track/3bMveJpCPytU79V5A61Bb7?si=b978f6202fd3484d",
  secretLetter: `Meus olhos brilham sempre que eu te vejo feliz!

Sorte grande essa minha de encontrar tudo em você. As coisas que eu te desejo são incabíveis até nas maiores extensões; mas eu torço todo dia para que você nunca perca o gosto por viver com intensidade e intenção, e que a vida seja tão generosa contigo como você é com ela.

Cê é fora da curva e transcende qualquer parâmetro. Quem te tem de pertinho, vê de longe.

Obrigado por ser tããão assim, por fazer toda a jornada ter sentido e por ter deixado claro, desde o dia em que eu me apaixonei por você, que o melhor lugar do mundo é aqui e agora.

Saiba que eu tenho muito orgulho de você por tudo que já conquistou, e vai conquistar ainda mais. Amo cada segundo, cada detalhe, cada sorriso, cada gargalhada. Conhecer você foi a melhor coisa que já me aconteceu em toda a minha vida. Eu amo viver com você, meu amor. Você é uma pessoa muito leve, com quem as pessoas gostam de estar perto, onde elas se sentem confortáveis. Você tem um coração maravilhoso, um coração que eu nunca vi em ninguém, uma visão de mundo que nunca enxerguei em ninguém. Esses são alguns dos detalhes que me fazem apaixonar por você cada vez mais. Acho incrível o quanto é forte e esperta, e como consegue transformar tudo em algo mais simples ou mais leve de se fazer. Amo olhar para um ano atrás e ver o quanto mudei, o quanto melhorei em vários aspectos. Amo ver o quanto nós melhoramos e mudamos por nós, sempre pensando em nós, e isso me cativa cada vez mais. Amo como você traz à tona um Gustavo totalmente despreocupado, mas preocupado com os detalhes, no que eu vou fazer para te conquistar, o que fazer para te surpreender, onde eu vou encontrar as flores mais lindas dessa cidade para eu te entregar em um dia de semana qualquer. Eu amo isso, é algo que você trouxe à tona. Você fez florescer esse Gustavo todo apaixonado e extremamente perdido pela mulher que ele tem, que é você. Mas, como eu sempre te falei, são nos pequenos detalhes que eu me apaixono por você. Desde aquela sexta-feira à noite no carro, foi onde eu tive a melhor sensação da minha vida com a tua companhia. Eu me senti leve, extremamente feliz, onde mesmo te conhecendo há literalmente algumas semanas, eu estava sendo o Gustavo como você conhece hoje: sem filtros, sem esconder nada. Me senti tão confortável ao seu lado que eu contei coisas para você que ninguém sabia, mas por algum motivo eu me senti muito bem e sabia que poderia confiar em você para me abrir e contar algo tão íntimo. E ver o quanto somos parecidos, gostamos das mesmas coisas, mesmos desenhos, passamos horas vendo bobagens, vídeos no TikTok, jogando Pokémon GO (e você debochando de mim por causa do meu personagem que estava malvestido), assistimos Fodêncio... Mas ali eu senti algo tão forte que meu coração falava "EU QUERO ESSA MULHER PARA A MINHA VIDA INTEIRA", e você traz esse sentimento à tona todos os dias, simplesmente por ser você, por ser a Rayssa que tanto amamos. Você é uma mulher extremamente forte, inteligente, dedicada, esforçada, LINDA, maravilhosa. Eu admiro muito você por ver o quanto é dedicada, que quando fala "eu quero", você pega e corre atrás de tudo, sem depender de ninguém. Eu, a cada dia mais, me apaixono ainda mais por você. Todos os dias eu admiro ainda mais você e estou muito feliz até onde você chegou até agora. Quero te ajudar a conquistar seus sonhos, porque eles fazem parte dos meus agora. Te ver vencer significa que eu também consegui uma vitória, e tenho certeza, como eu te conheço, que esse é apenas o começo do sucesso que você vai alcançar, e não demora muito para que isso aconteça.

O que quero dizer é que te amo. Fico muito feliz em poder dividir desde novo a minha vida com você, poder fazer parte da sua vida, dividir alegrias e tristezas, risadas e abraços. Porque eu sei que se cada um tivesse uma Rayssa como eu tenho, certeza total que o mundo seria um lugar extremamente melhor para se viver, porque quem não tem uma Rayssa do seu lado não é feliz totalmente.

Meu amor, você é a razão de tudo para mim. Poder ter você e poder te chamar de amor, e futuramente poder gritar para esse mundo "ELA É MINHA ESPOSA", é algo que eu realmente quero viver o quanto antes, porque viver com você é maravilhoso. O mundo tem mais cores, as músicas têm batidas mais animadas, os problemas desaparecem, a felicidade fica escancarada na nossa cara. A vida ao seu lado se torna leve, gostosa de ser vivida: apreciar cada detalhe, se perder no brilho dos seus olhos, se encantar com esse sorriso, viajar nas suas risadas, aproveitar o aroma do seu perfume, apreciar seu toque, que me faz me sentir no espaço... Sem falar na sua presença, onde o mundo finalmente fica silencioso, os problemas todos têm solução, a mente finalmente relaxa e não pensa mais em nada, apenas aproveitando a tua companhia, onde a vida para de ser problemática e ela se torna perfeita. A saudade se torna tão gostosa, porque ela não é dolorida, é aquela saudade boa. Amo como me motiva todos os dias, me faz ter mais forças e esperança, me fazendo ser um homem mais forte, mais corajoso, um homem mais romântico, feliz, animado, carismático, e o principal: ser uma pessoa de verdade com um coração bom, sem julgamentos, apenas um coração com amor disposto a ajudar todos que for possível.

Essas são apenas algumas coisas que você transformou em mim apenas por viver ao meu lado. Você é tão maravilhosa e incrível. Quem conhece a Rayssa muda de vida na hora para uma vida melhor, onde fica se questionando como passou tanto tempo sem esse sentimento bom e confortável.

Sem contar o quanto você é linda e maravilhosa, a mulher mais linda deste mundo inteiro. Sou completamente apaixonado por você.

Aproveita seu dia, minha princesa. Eu te amo muito, muito, muito mesmo. A minha esposa perfeita, mulher maravilhosa, incrível. Só de pensar no dia em que eu te verei de vestido branco vindo para mim...

Feliz Aniversário, minha Esposa!`,
  customQuote: "Eu te amo porque você é forte, incrível e me inspira todos os dias",
  storyTitle: "por que te amo",
  heroNumber: "12.09",
  anniversaryTitle: "Feliz Aniversário Meu Amor",
  heroHeading: "FELIZ ANIVERSÁRIO",
  heroSubheading: "MEU AMOR.",
  heroTagline: "Feliz aniversário meu amor • 12.09",
};

export const defaultAssets = {
  coupleEmbrace: PHOTO_COUPLE_SKATE_COUCH,
  coupleEmbracePhoto: PHOTO_NIGHT_TREE,
  pinkLily: pinkLilyImg,
  pinkVinyl: pinkVinylImg,
  blueFlowers: blueFlowersImg,
  singleFlower: singleFlowerImg,
  chromeCross: pinkFlowersEmblemImg,
  pinkFlowersEmblem: pinkFlowersEmblemImg,
  pinkFlowerBloom: pinkFlowerBloomImg,
};

export const defaultReasons: LoveReason[] = [
  {
    id: 1,
    title: "O seu sorriso que ilumina tudo",
    description: "Mesmo nos dias mais cinzentos ou difíceis, ver você sorrir tem o poder instantâneo de me acalmar e fazer meu coração bater mais forte.",
    icon: "Heart",
  },
  {
    id: 2,
    title: "O calor do seu abraço",
    description: "É o único lugar do mundo onde o tempo parece parar e todas as preocupações simplesmente desaparecem.",
    icon: "Sparkles",
  },
  {
    id: 3,
    title: "Sua doçura e seu coração bom",
    description: "A forma carinhosa como você se importa com quem ama e a delicadeza com que enxerga a vida me encantam a cada dia.",
    icon: "Flower2",
  },
  {
    id: 4,
    title: "Nossas risadas bobas juntos",
    description: "As piadas internas que só nós dois entendemos e a cumplicidade de rir até a barriga doer sem precisar de motivo.",
    icon: "Smile",
  },
  {
    id: 5,
    title: "A sua voz e seu jeito único",
    description: "Ouvir sua voz é o meu momento favorito do dia. Seu jeitinho, suas manias e sua presença tornam minha vida infinitamente mais bonita.",
    icon: "Music",
  },
  {
    id: 6,
    title: "Crescer e sonhar ao seu lado",
    description: "Saber que cada plano de futuro fica mais especial porque é você quem vai estar comigo em cada passo da jornada.",
    icon: "Stars",
  },
];

export const defaultMilestones: TimelineMilestone[] = [
  {
    id: "m1",
    chapter: "Chapter 01",
    date: "O Início",
    title: "O dia em que nossos olhares se cruzaram",
    description: "Ainda me lembro da sensação do primeiro momento. Parecia um dia qualquer, mas o destino já estava preparando o início da melhor história da minha vida.",
    quote: "Hermosa la naturaleza",
    tag: "Primeiro Olhar",
  },
  {
    id: "m2",
    chapter: "Chapter 02",
    date: "Primeiro Encontro",
    title: "Horas que pareceram minutos",
    description: "A conversa fluindo sem esforço, o nervosismo bom no estômago e a certeza imediata de que eu queria ficar ali para sempre.",
    quote: "FREEDOM & HOWL",
    tag: "Conexão",
  },
  {
    id: "m3",
    chapter: "Chapter 03",
    date: "O Pedido",
    title: "O sim mais feliz do mundo",
    description: "Quando oficializamos o que nossos corações já sabiam há muito tempo: fomos feitos para caminhar juntos.",
    quote: "Golden and eternal",
    tag: "Nosso Marco",
  },
  {
    id: "m4",
    chapter: "Chapter 04",
    date: "Para Sempre",
    title: "Todos os amanhãs com você",
    description: "Cada novo dia é uma nova página linda que escrevemos juntos, cheia de amor, carinho e sonhos a realizar.",
    quote: "Engraved in my heart",
    tag: "Futuro",
  },
];

export const defaultGallery: MemoryPhoto[] = [
  {
    id: "p1",
    title: "Gustavo & Rayssa",
    date: "12 de Setembro",
    caption: "A sensação de estar exatamente onde eu sempre pertenci.",
    imageUrl: PHOTO_COUPLE_SKATE_COUCH,
    rotation: -2,
    imagePositionClass: "object-[50%_58%]",
  },
  {
    id: "p2",
    title: "Nosso Sorriso",
    date: "Sempre Juntos",
    caption: "Cada segundo coladinho em você faz tudo valer a pena.",
    imageUrl: PHOTO_SELFIE_KISS,
    rotation: 2,
    imagePositionClass: "object-[50%_20%]",
  },
  {
    id: "p3",
    title: "Cumplicidade & Risadas",
    date: "Pequenos Detalhes",
    caption: "Nossas bobeiras juntos são os momentos que mais amo guardar.",
    imageUrl: PHOTO_GLOSS_CLASSROOM,
    rotation: -1.5,
    imagePositionClass: "object-[50%_30%]",
  },
  {
    id: "p4",
    title: "Olhar Apaixonado",
    date: "Sob as Estrelas",
    caption: "Me perder no brilho dos seus olhos e nesse sorriso que ilumina tudo.",
    imageUrl: PHOTO_NIGHT_TREE,
    rotation: 2.5,
    imagePositionClass: "object-[50%_40%]",
  },
  {
    id: "p5",
    title: "Aconchego no Sofá",
    date: "Paz & Amor",
    caption: "O mundo fica silencioso e leve quando estou aproveitando a sua companhia.",
    imageUrl: PHOTO_COUCH_COZY,
    rotation: -2,
    imagePositionClass: "object-[50%_35%]",
  },
  {
    id: "p6",
    title: "A Mulher Mais Linda",
    date: "Jantar Especial",
    caption: "Meus olhos brilham sempre que eu vejo você linda e feliz assim.",
    imageUrl: PHOTO_RESTAURANT,
    rotation: 1.5,
    imagePositionClass: "object-[50%_32%]",
  },
  {
    id: "p7",
    title: "Coração Gigante",
    date: "Doçura",
    caption: "Seu jeito carinhoso e esse coração maravilhoso que encanta tudo ao redor.",
    imageUrl: PHOTO_BLACK_CAT,
    rotation: -1.5,
    imagePositionClass: "object-[50%_30%]",
  },
  {
    id: "p8",
    title: "Meu Amor",
    date: "Para Sempre",
    caption: "Linda, forte e maravilhosa — te amar é a melhor coisa da minha vida.",
    imageUrl: PHOTO_MALL_SMILE,
    rotation: 2,
    imagePositionClass: "object-[50%_38%]",
  },
];
