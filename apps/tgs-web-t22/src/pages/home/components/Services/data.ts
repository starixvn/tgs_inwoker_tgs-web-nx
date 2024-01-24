import card1 from '@/assets/t22/images/home/card_1.png';
import card2 from '@/assets/t22/images/home/card_2.png';
import card3 from '@/assets/t22/images/home/card_3.png';
import card4 from '@/assets/t22/images/home/card_4.png';


type Badge = {
  value: number,
  unit?: string,
  text: string,
}

type Card = {
  icon: string,
  title: string,
  content: string,
}

export const badges: Badge[] = [
  {
    value: 60,
    unit: 'GIÂY',
    text: 'DEPOSIT TIME/s',
  },
  {
    value: 100,
    unit: 'NHÀ',
    text: 'BOOKIE COOPERATION',
  },
  {
    value: 60,
    unit: 'GIÂY',
    text: 'WITHDRAWAL SPEED/s',
  },
  {
    value: 1000,
    text: 'SUPPLIER',
  },
];

export const cards: Card[] = [
  {
    icon: card1,
    title: 'Quick Deposit and Withdrawal',
    content: 'Research and develop a financial processing system using the latest technology to DEPOSIT-WITHDRAW MONEY at super-fast speeds, optimize data transmission, and provide players with a powerful experience.',
  },
  {
    icon: card2,
    title: 'Manage encryption security',
    content: 'Exclusively developed with 128-bit encryption technology and strict safety management system, your account and money will be absolutely safe and secure, so you don\'t have to worry! Helping you experience peace of mind at Pega Gaming.',
  },
  {
    icon: card3,
    title: 'Betting diversity Rich games',
    content: 'Providing you with exciting sports events, Casino, Lottery, video games, etc. Choose from a variety of entertainment methods, allowing you to have a perfect gaming experience.',
  },
  {
    icon: card4,
    title: 'Three ways to choose for you',
    content: 'Excellent technology leading the market has independently developed applications.\n' +
      'Let you enjoy WEB, H5, multiple operating systems, IOS applications, Android applications, allowing you to have fun anytime, anywhere, easy payment! ',
  },
]
