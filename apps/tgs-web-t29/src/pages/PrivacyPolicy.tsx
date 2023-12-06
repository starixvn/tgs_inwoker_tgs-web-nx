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

const PrivacyPolicy = () => {

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
      <h1>PRIVACY POLICY</h1>
      <p>Last revised: 2022/12/09</p>
      <h2>INTRODUCTION</h2>
      <p>
        {getBrand()}, including its affiliates (collectively, the "{getBrand()}
        "), offers online gambling services through websites, mobile apps and
        other online properties (collectively, the “Services”).
        <br />
        <br />
        {getBrand()} is deeply committed to safeguarding the privacy
        expectations of its users (“User(s)”, “you” or “your”). Accordingly, we
        have put in place this Privacy Policy, which outlines our data
        protection practices, including how we collect, use, disclose and
        protect your Personal Information, as well as your rights with respect
        to your Personal Information.
        <br />
        <br />
        We encourage you to read the Privacy Policy carefully and use it to make
        informed decisions. By visiting the {getBrand()}
        ’s websites, mobile apps or other online properties, or by creating an
        account through our Services, you hereby agree to the Privacy Policy.
        <br />
        <br />
        If you have any questions (or comments) concerning your information, or
        this Privacy Policy, you are welcome to contact our Data Protection
        Officer at: service@youremail.com
      </p>
      <h2>WHAT INFORMATION WE COLLECT?</h2>
      <p>
        We collect two types of information from our Users:
        <br />
        <br />
        Personal Information
        <br />
        The first type of information is information that identifies or may
        reasonably identify an individual with reasonable effort (“Personal
        Information”). Personal Information which is being gathered may consist
        of the following:
        <br />
        <br />
        Registration details: When you open an account and register to use the
        Services, you will be asked to provide us with certain details about
        yourself, such as: first and last name, email address, gender, birth
        data, physical address, ID number, phone number, occupation, etc.
        <br />
        Governmental-issued ID: In certain instances, you will be required to
        provide a copy of a governmental-issued ID, for the identity
        verification process. Please note that this information is required for
        certain features of our Services.
        <br />
        Payment information: In order for you to enjoy all of the functions of
        the Services (e.g. place bets, perform purchases, play in tournaments,
        etc.), payment information will be collected from you, such as your
        credit card number and bank account details.
        <br />
        Voluntary information: We also collect information which you provide us
        voluntarily. For example, when you respond to communications from us,
        communicate with us via email or share additional information about
        yourself through your use of the Services, such as on the chat feature
        and in games.
        <br />
        Device information: We collect specific types of connection details and
        information with regard to your device, software or hardware that may
        identify you, such as: device’s unique identifiers (e.g. UDID, IMEI, MAC
        address), browser fingerprinting, IP address and geo-location data.
        <br />
        Telephone calls: We record or monitor telephone calls for customer
        support, training and/or security purposes.
        <br />
        Social networks: When you register through your social network account
        (such as your Facebook account), to use the Services or connect your
        player account with such account, we will have access to basic
        information from your social network account, such as your name,
        birthdate, profile picture and friends' list, as well as information you
        made publicly available on such account.
        <br />
        In addition, when using the Services, you may be able via your social
        network to "Invite a Friend" to use the Services. Should the person
        accept your invitation, we may obtain Personal Information from him/her
        such as: name, email address, phone number and date of birth. We will
        use the Personal Information for the purposes set out herein and
        disclose such information only to third parties as detailed in this
        Privacy Policy.
        <br />
        Information we collect from third parties: We collect Personal
        Information from third party service providers, such as information
        about your credit history from credit agencies and other financial
        information which is relevant to the provision of the Services, as well
        as information which is gathered in order to verify your identity and
        prevent fraudulent or illegal activity.
      </p>

      <h2>Non-personal information</h2>
      <p>
        The second type of information is un-identified and non-identifiable
        information pertaining to a User(s), which may be made available or
        gathered via the User’s use of the Services (“Non-Personal
        Information”).
        <br />
        <br />
        Non-Personal Information which is being collected consists of technical
        information and aggregated usage information, and may contain, among
        other things, the User’s operating system, type of browser, screen
        resolution, browser and keyboard language, the User’s ‘click-stream’ and
        activities on the Services, the period of time the User visited the
        Services and related timestamps, etc.
        <br />
        <br />
        For avoidance of doubt, any Non-personal Information connected or linked
        to any Personal Information shall be deemed as Personal Information as
        long as such connection or linkage exists.
        <br />
        <br />
        Types of Non-personal Information we collect from or about you:
        <br />
        <br />
        Technical information: In order to enhance the functionality of the
        Services and to provide you with a better user experience, we collect
        technical information transmitted by your device, including certain
        software and hardware information (e.g. the type of browser and
        operating system your device uses, language preference, access time and
        the domain name of the website from which you linked to the Services;
        etc.).
        <br />
        Gameplay information: We record game play information including, amongst
        other things, your deposits, bets, bonuses, game session duration and
        your high scores. We may also share and publish such information through
        any of our Platforms.
        <br />
        Device and connection information: If you download the Software to your
        device, we may collect information from the particular device you are
        using, for security and fraud detection and prevention purposes. For
        example, we may gather information with regard to other software which
        is running simultaneously with the Software for detecting if you are
        using software which is associated with fraudulent activity (e.g.
        robots, malware, etc.) or checking if the connection you are using is
        via a VPN or proxy.
        <br />
        Analytics information: We collect information about your use of the
        Services, such as applications' usage, log files, user activity (e.g.
        pages viewed, the amount of time spent on particular pages, online
        browsing, clicks, actions, etc.), time stamps, alerts, etc. This
        information is collected for amongst other things troubleshooting errors
        and bugs as well as for research and analytics purposes about your use
        of the Services.
        <br />
        Anonymous information: We may anonymize or de-identify the information
        collected by the Services or via other means so that the information
        cannot, on its own, personally identify you. Our use and disclosure of
        such aggregated or de-identified information is not subject to any
        restrictions under this Privacy Policy, and we may disclose it to others
        without limitation and for any purpose, such as for advertising or
        marketing purposes.
        <br />
        MINORS
        <br />
        The Services are not designed or directed to persons under the age of 18
        or persons under the age of legal consent with respect to the use of the
        Services of any jurisdiction, whichever is higher (“Legally of Age”). If
        you are not Legally of Age, you should not download or use the Services
        nor provide any Personal Information to us.
        <br />
        <br />
        We reserve the right to access and verify any Personal Information
        collected from you. In the event that we become aware that a user who is
        not Legally of Age has shared any information, we may discard such
        information. If you have any reason to believe that a minor has shared
        any information with us, please contact us.
      </p>

      <h2>HOW WE USE THE COLLECTED INFORMATION?</h2>
      <p>
        We use your Personal Information for the purposes listed below:
        <br />
        <br />
        To set up, manage and update your account;
        <br />
        To provide and operate the Services (such as for betting and payment
        processing);
        <br />
        To communicate with you and to keep you informed of our latest updates
        to our Services and special offers;
        <br />
        To market our Services (see more below under “Marketing”), as well as to
        serve you advertisements, including behavioral advertising;
        <br />
        To conduct analytics, statistical and research purposes, in order to
        improve and customize the Services to your needs and interests (such as
        by compiling aggregated reports about the usage of certain features of
        our Services);
        <br />
        For Customer Relationship Management purposes, and to support and
        troubleshoot the Services and to respond to your queries;
        <br />
        To enable us to further develop, customize and improve the Services
        based on Users’ common preferences and uses;
        <br />
        To provide you with a responsible gaming environment;
        <br />
        To communicate with your and to process any of your requests to exercise
        your User Rights;
        <br />
        To identify and authenticate your access to certain features of the
        Services;
        <br />
        To detect and prevent fraudulent and illegal activity or any other type
        of activity that may jeopardize or negatively affect the integrity of
        the Services, including by identifying risks associated with your
        activity on our Services;
        <br />
        To investigate violations of our policies and User Agreement as well as
        enforce our policies and the User Agreement;
        <br />
        To investigate and resolve disputes in connection with your use of the
        Services; and
        <br />
        As required by law or regulation (such as Know Your Customer ("KYC") and
        Anti-Money Laundering regulatory requirements), or as required by other
        governmental authorities, or to comply with a subpoena or similar legal
        process or respond to a government request.
      </p>

      <h2>MARKETING</h2>

      <p>
        {getBrand()} will use your Personal Information, such as your name, home
        address, email address, telephone number etc., ourselves or by using our
        third party subcontractors for the purpose of providing you with
        promotional materials, concerning the Services as well as products,
        services, websites and applications, which we believe may interest you.
        <br />
        <br />
        We may also share and disclose Personal Information with our Marketing
        Affiliates for the purpose of providing you different marketing offers,
        which we, or our Marketing Affiliates, believe are relevant for you. Our
        Marketing Affiliates may use this Personal Information for different
        marketing techniques, such as direct email, post, SMS and telephone
        marketing purposes.
        <br />
        <br />
        You may update your marketing preferences at any time through Customer
        Services (where available). When you choose to download Software
        pursuant to our Services, notification software may also be downloaded
        onto your device. This allows us to send notifications to you about our
        Services directly to your device, for example to inform you about new
        features, updates, service communications, offers and promotions.
        <br />
        <br />
        You may at any time decline receiving further marketing offers from us
        or from our business partners and marketing affiliates by contacting via
        Live Chat. Please note that even if you unsubscribe from our marketing
        mailing list, we may continue to send you service-related updates and
        notifications.
      </p>

      <h2>WITH WHOM WE SHARE INFORMATION?</h2>

      <p>
        We do not rent, sell, or share your Personal Information with third
        parties (“Recipients”) except as described in this Privacy Policy. The
        Personal Information will be disclosed to Recipients only to the extent
        required for the specific purpose, as stipulated in this Privacy Policy.
        <br />
        <br />
        We share Personal Information with any of the following recipients:
        <br />
        White Label Brands, including any replacement service provider that the
        White Label Brand may engage to operate the White Label Brands (if
        applicable);
        <br />
        Companies within {getBrand()} and other affiliated companies;
        <br />
        Subcontractors and third party service providers, as well as their
        subcontractors, which by way of example include (but is not limited to)
        cloud computing companies, marketing affiliates, identity verification
        and fraud prevention services, and other data verifiers;
        <br />
        Credit reporting agencies;
        <br />
        Payment service providers, payment processors and banks;
        <br />
        To any third parties who provide services in relation to the operation
        or promotion of the applicable In House Brand or the White Label Brands
        (if applicable);
        <br />
        To any third parties who organize offline events or tournaments on
        behalf of or in conjunction with any companies within {getBrand()};
        <br />
        To hotels and flight companies (such as in the context of offline events
        and promotions);
        <br />
        Auditors, contractors or advisers of any of {getBrand()}’s business
        processes;
        <br />
        To any third parties who investigate, detect or prevent fraudulent or
        illegal activity (e.g. governmental authorities, police, banks and other
        investigatory organizations);
        <br />
        Licensing authorities, governmental and regulatory bodies, in accordance
        with applicable laws and regulations; and
        <br />
        Potential purchasers or investors in any of the companies within the
        Group or While Label Brand (if applicable), or in the event of a
        corporate transaction (e.g. sale of a substantial part of our business,
        merger, reorganization, bankruptcy, consolidation or asset sale of an
        asset or transfer in the operation thereof) in relation to any company
        within {getBrand()} (in such event, the acquiring company or transferee
        will assume the rights and obligations as described in this Privacy
        Policy).
        <br />
        In addition to the purposes listed in this Privacy Policy, we share
        Personal Information with those Recipients for any of the following
        purposes:
        <br />
        <br />
        Storing such information on our behalf, for example by using cloud
        computing service providers;
        <br />
        Processing such information to assist us with our business operations
        (e.g. to process payments and your deposits; authenticate your access;
        auditing our operations; detect and prevent fraudulent or illegal
        activity; etc.);
        <br />
        Performing research, technical diagnostics or analytics;
        <br />
        Communicating targeted advertising, as well as promotional and
        informational materials, in accordance with our marketing policy (see
        below, under "Marketing"); and
        <br />
        Whenever we believe in good faith that disclosure is necessary to
        protect our rights or legal claims, enforce our policies, protect your
        safety or the safety of others, as well as to investigate or prevent any
        fraud, for security reasons or to help us with any other related
        technical issue.
        <br />
        <br />
        We use best efforts to ensure that your Personal Information is
        protected in accordance with our privacy policy, through contractual
        means (such as by using the contractual clauses approved by the relevant
        regulators for data transfer) or other means (such as ensuring that the
        jurisdiction imposes adequate safeguards for data protection).
        <br />
        <br />
        If you feel that your privacy was treated not in accordance with our
        policy, or if any person attempted to abuse the Services or acted in an
        inappropriate manner, please contact us directly via Live Chat.
      </p>

      <h2>THIRD PARTY TRACKING TECHNOLOGIES</h2>
      <p>
        When you visit or access our Services (for example when you visit our
        websites), we use (and authorize third parties to use) web beacons,
        cookies, pixels, scripts, tags and other technologies ("Tracking
        Technologies").
        <br />
        <br />
        The Tracking Technologies allow us to automatically collect information
        about you and your online behavior, as well as your device (for example
        your computer or mobile device), for different purposes, such as in
        order to enhance your navigation on our Services, improve our Services’
        performance and customize your experience on our Services. We also use
        this information to collect statistics about the usage of our Services,
        perform analytics, deliver content which is tailored to your interests
        and administer services to our Users, advertisers, publishers, customers
        and partners.
        <br />
        <br />
        We also allow third parties to collect information about you through
        Tracking Technologies. To learn more please visit our Cookie Policy.
        <br />
        <br />
      </p>

      <h2>THIRD PARTY SERVICES</h2>

      <p>
        While using the Services you may encounter links to third party
        websites, services or applications. Please keep in mind that this
        Privacy Policy does not apply to any third party websites, services or
        applications, even if they are accessible, downloadable, or otherwise
        distributed through the Services.
        <br />
        <br />
        Please be advised that such third party websites, services or
        applications are independent from {getBrand()}. We assume no
        responsibility or liability whatsoever with regard to privacy matters or
        any other legal matter with respect to such third party websites and/or
        services. We encourage you to carefully read the privacy policies and
        the terms of use of such third party websites and/or services, as their
        terms, not ours, will apply to any of your interactions with such third
        parties.
        <br />
        <br />
        You should always review their privacy practices carefully before
        providing Personal Information to such third parties.
        <br />
        <br />
        You are knowingly and voluntarily assuming all risks of using any
        third-party websites, services or applications. You agree that we shall
        have no liability whatsoever with respect to such third party sites and
        your usage of them.
      </p>

      <h2>RETENTION OF PERSONAL INFORMATION</h2>
      <p>
        If you have registered with an account through our Services,{" "}
        {getBrand()} will retain your Personal Information during the period
        your account is active. In addition, {getBrand()} will retain your
        Personal Data for additional periods, to enable {getBrand()} to meet its
        legal obligations under applicable laws or regulations, such as the
        applicable gambling regulations, Know-Your-Customer and Anti-Money
        Laundering regulations.
        <br />
        <br />
        In addition, {getBrand()} may retain your Personal Information for
        longer periods, provided that retaining such information is necessary
        for {getBrand()}’s legitimate interests, such as fraud prevention and
        record keeping.
        <br />
        <br />
        If for any reason you wish to delete your Personal Information, please
        send us an e-mail to service@youremail.com, and we will make reasonable
        efforts to address your request.
      </p>

      <h2>YOUR RIGHTS</h2>

      <p>
        You may contact us at any time by email, and request:
        <br />
        <br />
        To access or delete any Personal Information relating to you
        <br />
        To change or update any Personal Information relating to you (for
        example, if you believe that your Personal Information is incorrect, you
        may ask to have it corrected or deleted). Note that you may also request
        that we will correct errors with regard to your Personal Information
        (except in cases where the information is required to be kept in its
        original format under any applicable laws and regulations);
        <br />
        That we will restrict or cease any further use of your Personal
        Information;
        <br />
        That we will provide the Personal Information you volunteered to us in a
        machine-readable format.
        <br />
        Please note that these rights are not absolute and requests are subject
        to any applicable legal requirements, including gambling regulations and
        other legal and ethical reporting or document retention obligations. We
        may also rectify, replenish or remove incomplete or inaccurate
        information, at any time and at our own discretion, in accordance with
        our internal policies.
      </p>

      <h2>HOW WE KEEP YOUR INFORMATION SECURED</h2>
      <p>
        The security of your personal information is extremely important. We
        maintain commercially reasonable technical, administrative, physical,
        electronic, and procedural safeguards to protect the confidentiality and
        security of personal information provided to us.
        <br />
        <br />
        We will take all steps reasonably necessary to ensure that your data is
        treated securely and in accordance with this Privacy Policy. However, no
        communication over the Internet can be guaranteed to be completely
        secure. Although we take care to protect your personal information, we
        cannot guarantee or warrant the security of any information you provide
        to us, so you do so at your own risk.
        <br />
        <br />
        The security of your information with us is also dependent on you.
        Please keep any account information, including access to your mobile
        phone secure. You are responsible for maintaining the confidentiality of
        your account information.
      </p>

      <h2>CHANGES TO THE PRIVACY POLICY</h2>

      <p>
        Any changes we may make to our Privacy Policy in the future will be
        posted on this page and on our Website. Please check this page
        occasionally to ensure you are happy with any changes.
      </p>

      <h2>HOW TO CONTACT US</h2>

      <p>
        If you have any general questions about the Services or the information
        that we collect about you and how we use it, please contact us via our
        chat facility on our contact us page.
      </p>
    </Container>
  );
};

export default PrivacyPolicy;
