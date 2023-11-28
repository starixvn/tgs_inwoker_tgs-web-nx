import config from '@tgs-web-nx/config';
import styled from "styled-components";
import { media } from '@/theme/breakpoints';
import { SUB_CONTENT_MAX_WIDTH } from '@/theme/constants';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: transparent;
  color: ${({ theme }) => theme.gray60};
  padding: 20px;
  gap: 6px;
  flex-shrink: 0;
  flex: 1;

  & h1 {
    font-size: 3rem;
    font-weight: 500;
  }

  & h2 {
    font-size: 1.75rem;
    font-weight: 400;
    margin: 10px 0;
  }
  
  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 30px;

    & h1 {
      font-size: 3.125rem;
    }
  }
`;

const Faq = () => {

  const getBrand = () => {
    switch (config.brand) {
      case "TEP":
        return "TEP";
      case "PGG":
        return "Pega Gaming";
      default:
        return config.brand;
    }
  }

  return (
    <Container>
      <h1>FAQs</h1>
      <p>
        Get the answers to your Frequently Asked Questions about {getBrand()}{" "}
        right here. Then get back to playing and having the most fun possible at
        our casino online!
      </p>
      <h2>What features can I find in {getBrand()}?</h2>
      <p>
        {getBrand()} is the start of your online casino experience. When you log
        in, the online casino provides an easy way for you to stay in the know
        about daily promotions, most popular games or browse through top news
        and trends. You’ll see different gaming categories like slots, live
        dealer games and jackpots.
      </p>
      <h2>What Are Online Slots?</h2>
      <p>
        An online slot is a virtual casino game that plays out on a set of reels
        at an online casino. Different types of symbols populate the reels. In
        each round of the game, or spin, the reels spin and the symbols take up
        new positions, forming different combinations of symbols on the reels,
        which determines whether the player has collected any wins in that
        round. The patterns that the symbols have to form to generate wins are
        determined by a pay-out mechanic, which differs from game to game.
      </p>
      <h2>How Do Online Slots Work?</h2>
      <p>
        When the player clicks ‘spin’, the symbols appear on the reels at
        random. Combinations of matching symbols generate potential wins. These
        combinations can be paylines, clusters or “ways to win”. Slots usually
        have a main game and special bonus features that award things like win
        multipliers and free spins.
      </p>
      <h2>Can I play online slots at {getBrand()}?</h2>
      <p>
        Yes! Players can enjoy a wider range of online slots at {getBrand()}.
        Titles range from classic three-reel slots that emulate the original
        Vegas-style land-based cabinet slots to online video slots that draw on
        state-of-the-art graphics, sounds and animation for immersive,
        compelling game-play.
      </p>
      <h2>Which Online Slots Are The Best?</h2>
      <p>
        Ultimately, the player decides which are the best online slots for their
        particular preferences and style of play. All players are sure to find
        the best slots for them at {getBrand()} because there are over 500
        online slots to choose from.
      </p>
      <h2>Are all online casinos legal and fair?</h2>
      <p>
        Some online casinos carry a bad reputation, but {getBrand()} operates
        fairly and legally as it is regulated by the PAGCOR and has earned the
        prestigious independent seal of approval for safety and fairness. This
        casino guarantees online safety and has received accreditation to
        operate annually since 2018. {getBrand()} ensures strict rules and
        protocols are followed in order to fulfill the high standards that the
        industry has set.
      </p>
      <h2>Can you win real money with online casinos?</h2>
      <p>
        Yes, you can win real money when you play with certain online casinos.{" "}
        {getBrand()} offers a wide variety of online slots, table games, live
        dealer games and progressive jackpots to all its players. These
        life-changing progressives often start at $1 Million and can be won with
        one lucky spin. The games can be enjoyed at any time with bets starting
        at $1 or less.
      </p>
      <h2>What type of online casino games payout the most?</h2>
      <p>
        {getBrand()}’s progressive jackpots pay out the most and can be won at
        any time. Online slots and table games are also popular for lucrative
        payouts, and depositing and withdrawing is hassle-free thanks to the
        efficient range of banking methods available.
      </p>
      <h2>Which payment methods does {getBrand()} offer?</h2>
      <p>
        Players can deposit and withdraw via several seamless options, including
        bank transfers and web wallets like GCash. Once logged in, simply follow
        the instructions, complete the details to initiate a deposit or a
        withdrawal and submit. Safe and secure transactions can be completed
        24/7 via mobile or desktop, and a customer service team works around the
        clock to assist with any account related queries.
      </p>
      <h2>Can online casinos provide a realistic experience?</h2>
      <p>
        Yes, {getBrand()}’s innovative slot and live dealer selection is
        ultra-realistic and allows players to stream live table games online or
        via mobile. Their portfolio includes classic slots, video poker, table
        games, sportsbook, cockfighting, casual games, multiplayer titles and
        more in real time and in high definition. The live casino runs on
        intelligent HD-technology, and you can interact with other players from
        all around the world.
      </p>
      <h2>What kind of bonuses does {getBrand()} offer?</h2>
      <p>
        {getBrand()} offers generous match bonuses on your first four deposits
        to make sure you get the best start at the casino. {getBrand()} also
        regularly offers a variety of other promotions to all customers, such as
        deposit bonus and daily rebate.
      </p>
      <h2>Which online casino is the best?</h2>
      <p>
        Players rate {getBrand()} the best out of all available options because{" "}
        {getBrand()} hosts over 500 different casino games. With something for
        everyone, players can enjoy the games with complete peace of mind as{" "}
        {getBrand()} is licensed by PAGCOR. To ensure the best player
        experience, there’s 24-hour support available via live chat.
      </p>
      <h2>How do you start playing at {getBrand()}?</h2>
      <p>
        In order to play at {getBrand()}, you need to create an account and make
        a deposit. Once the deposit has successfully loaded to your account,
        you’re ready to bet on any of the over 500 casino games available. To
        deposit, simply follow the instruction, select a deposit method and fill
        in your details, and you’re ready to start playing!
      </p>
      <h2>How do online casinos work?</h2>
      <p>
        Online casinos work by making a large selection of games available to
        customers, who create accounts and deposit to play. The casino will
        verify details about the customers in order to remain compliant with
        regulations. Online casinos are strictly regulated to ensure a fair and
        legal environment is maintained.
      </p>
      <h2>How Do I Create an Account?</h2>
      <p>
        Creating a player account is very simple: 1. Select the “Register”
        button on the home screen. 2. Fill in the required information,
        including a username and password of your choice. 3. Confirm that you
        are of legal age to play. Your account will be ready within a few
        moments.
      </p>
      <h2>How Do I Login to My Account?</h2>
      <p>
        To login to your account make sure that your device is connected to the
        Internet and open the {getBrand()} homepage. Click the “Login” button,
        enter your username and password, and let the fun begin!
      </p>
      <h2>Help, I Forgot My Account Info…</h2>
      <p>
        If you’ve forgotten your password and you are trying to login to your
        account, don’t worry! Just click the “Forgotten Password” link on the
        login page and follow the instructions. We’ll assist you get your
        password back step by step.
      </p>
      <h2>How Do I Know Gaming is Safe and Fair?</h2>
      <p>
        {getBrand()} has been running since 2018, so we have a trusted brand
        with many years of experience behind us. We are also fully licensed by
        the PAGCOR. This means our security measures, game fairness and overall
        service have all been checked and found to meet high international
        standards.
      </p>
      <h2>Does {getBrand()} Support Responsible Gaming?</h2>
      <p>
        “Responsible gaming” is one of the most frequently heard gambling terms
        right now. At {getBrand()} we take the well-being of our players very
        seriously, so we definitely support gaming responsibly. We provide
        general information on problem gambling, including a self-assessment
        questionnaire, and give players the option of setting self-exclusion
        periods and deposit limits. You can learn more on our Responsible Gaming
        page.
      </p>
      <h2>Does {getBrand()} Offer Bonuses?</h2>
      <p>
        Yes, of course! Every respectable casino online offers bonuses and
        promotions, and {getBrand()} is more worthwhile than most. After you’ve
        made your first real money deposit you’ll be awarded our exceptional
        Welcome Bonus. Thereafter, look out for regular promotions that will
        keep your account topped up.
      </p>
      <h2>How Do I Place Bets?</h2>
      <p>
        At {getBrand()}, online real money bets are very easy to place. Choose
        the game you are interested in, and click or tap “Play Now”. You’ll see
        controls to set your bet type and amount, and once you’ve done this you
        can start your real money round.
      </p>
      <h2>What are Bonus Terms and Conditions?</h2>
      <p>
        The gambling terms and conditions on a bonus must be fulfilled before
        you are given the bonus itself, and before you can withdraw the funds.
        The conditions might stipulate how long you have to use the extra funds,
        or the games that you can play with them. The amount that you need to
        deposit to activate the bonus will be stated too.
      </p>
      <h2>What are Wagering Requirements?</h2>
      <p>
        Playthrough Requirements are also known as Wagering Requirements. They
        refer to how many times you need to bet a bonus amount before you are
        allowed to withdraw it. For example, if the Wagering Requirements on
        $100 is x50, you’ll need to bet $5000 before you can cash out that $100.
      </p>
      <h2>Why is the Bonus not in My Account?</h2>
      <p>
        If your bonus is not cleared into your player account, it’s usually
        because you haven’t met all the gambling terms and conditions that are
        required before a bonus is awarded. If you have met the terms and you’re
        still not receiving your extra funds, ask our Customer Support team for
        help.
      </p>
      <h2>Is There a VIP Loyalty Program?</h2>
      <p>
        {getBrand()} offers every kind of reward that you could wish for from an
        online casino, including a lucrative VIP Loyalty Program. Every time you
        place a real money bet, you’ll be closer to the next VIP level and also
        the exclusive benefits! Check our “VIP” page for more details.
      </p>
      <h2>What Are My Banking Options?</h2>
      <p>
        There’s more than just knowing how to play casino games to gambling
        successfully online. Secure and convenient banking options are also very
        important. In the “Deposit” and “Withdrawal” page you’ll be shown all
        the payment methods that are available to you.
      </p>
      <h2>How do I make Deposits?</h2>
      <p>
        Making deposits at our online casino is easy: 1. Navigate to the
        “Deposit” page, and choose the payment method that you want to use. 2.
        Enter the amount that you want to transfer, along with any other
        required details. 3. Check everything is correct, and click to confirm
        the deposit.
      </p>
      <h2>How do I make Withdrawals?</h2>
      <p>
        At {getBrand()} the process of cash withdrawals is also easy: 1. Go to
        the “Withdrawal” page. 2. Choose the existing bank card you wish to
        receive the cash, or add a new one. 3. Enter the amount you want to cash
        out. 4. Check that all details are correct and click to confirm your
        withdrawal. Our pending period is usually less than 24 hours, after
        which your request will be processed. The time taken for the funds to be
        transferred depends on the withdrawal system you’re using.
      </p>
      <h2>Why My Deposit Failed/ Missing?</h2>
      <p>
        Usually your deposit fails/ missing if you have insufficient funds, or
        if there is a technical connection problem between your device and the{" "}
        {getBrand()} site. Check that you have enough money available and that
        your Internet connection is working. If you’re still having trouble, try
        exiting the website and then logging back in. If you still don’t come
        right, contact our Customer Service via Live Chat.
      </p>
      <h2>Why My Withdrawal Failed?</h2>
      <p>
        If your withdrawal failed, please check the following issues: 1. Have
        the withdrawal requests pending and processing times finished? 2. Are
        your funds available or do you still need to fulfill certain terms and
        conditions before you can access them? 3. Is your Internet connection
        working? If none of these issues is the problem, re-login to your player
        account, and try again. If you’re still having trouble, please allow our
        Customer Service Agent to assist you via Live Chat.
      </p>
      <h2>Can I Play on My Mobile?</h2>
      <p>
        You don’t have to worry about how to play casino games when you’re busy
        and on the go, because {getBrand()} works just as well on tablets and
        smartphones as it does on desktops! Our flexible software works
        perfectly on whatever device you want to use, including iOS and Android.
        You’ll also use the same login information to access the same account as
        on your desktop, for total convenience.
      </p>
      <h2>I Need More Help…</h2>
      <p>
        If you haven’t found the answers you need on this FAQs page, you can get
        in touch with the {getBrand()} online Customer Service Agents at any
        time. They’re available via live chat 24 hours a day, 7 days a week.
        They’ll help you resolve any problem quickly and efficiently, from
        explaining gambling terms to dealing with deposit issues and everything
        in between!
      </p>
    </Container>
  );
};

export default Faq;
