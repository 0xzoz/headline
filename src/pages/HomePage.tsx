import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "components/Button";
import Title from "components/Title";
import Text from "components/Text";
import { AppWrapper, Layout, BodyContainer } from "components/Layout";
import LogoWordmark from "components/LogoWordmark";
import FullLogo from "components/FullLogo";
import HomeNav from "components/HomeNav";
import FAQSection from "components/FAQSection";
import MobileNav from "components/MobileNav";
import { DASHBOARD_URI } from "../constants";
import heroImage from "assets/img-hero.svg";
import heroImageMobile from "assets/img-hero-sm.svg";
import aboutImage from "assets/img-about.svg";
import visionImage from "assets/img-vision.svg";
import getStartedAnimation from "assets/get-started-animation.svg";

const StyledLayout = styled(Layout)`
  grid-template:
    "header"
    "body"
    "footer";
  @media (max-width: 768px) {
    grid-template:
      "header"
      "body"
      "mobileNav";
  }
`;

const StyledMainWrapper = styled(AppWrapper)`
  /* background: ${({ theme }) => `${theme.colors.almostWhite}`}; */
  background: #e5e5e5;
`;

const StyledBodyContainer = styled(BodyContainer)`
  grid-area: body;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 100%;
  background: #e5e5e5;
`;

const HomeHeaderContainer = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: column;
  padding: 4.8rem;
  background: #e5e5e5;

  @media (max-width: 768px) {
    padding: 2.4rem;
  }
`;

const HeroContainer = styled(BodyContainer)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.6rem;
  padding: 4.8rem;
  width: 100%;
  min-height: 80vh;
  background-color: #e5e5e5;

  background-image: url(${heroImage});
  background-position: "top left";
  background-size: contain;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    padding: 2.4rem;
    height: 100%;
    background-image: url(${heroImageMobile});
    background-position-y: 20rem;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const HeroCTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const HeroHeading = styled(Title)`
  font-size: 3.2rem;
  line-height: 3.8rem;
  @media (max-width: 768px) {
    font-size: 2.8rem;
    line-height: 3.2rem;
  }
`;

const AboutSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 4.8rem;
  @media (max-width: 768px) {
    flex-basis: 0;
    margin-top: 4.8rem;
    padding: 0 2.4rem;
    width: 100%;
    flex-wrap: wrap;
    word-wrap: break-word;
    min-width: 0;
  }
`;

const AboutHeading = styled.h2`
  font-size: 9.6rem;
  line-height: 10.2rem;
  color: ${({ theme }) => `${theme.colors.primary}`};
  margin-bottom: 6.4rem;
  margin-top: 0;
  @media (max-width: 768px) {
    font-size: 6.8rem;
    line-height: 7rem;
    word-wrap: break-word;
  }
`;

const AboutGrid = styled.div`
  display: flex;
  justify-content: center;
  /* grid-template-columns: 50% 50%;
  grid-template: "about-image" "about-copy"; */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AboutImageContainer = styled.div`
  grid-area: about-image;
  flex-basis: 46%;
  align-self: flex-end;
  order: 1;
  @media (max-width: 768px) {
    order: 2;
  }
`;

const AboutImage = styled.img`
  height: 100%;
  width: 100%;
`;

const AboutCopyContainer = styled.div`
  display: flex;
  grid-area: about-copy;
  flex-basis: 46%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  order: 2;
  padding-bottom: 4rem;
  @media (max-width: 768px) {
    order: 1;
  }
`;

const AboutCopy = styled.p`
  font-size: 2rem;
  line-height: 2.8rem;
  color: ${({ theme }) => `${theme.colors.primary}`};
  margin-bottom: 0;
`;

const AboutCallout = styled.span`
  font-size: 4.8rem;
  line-height: 5.2rem;
  font-weight: 700;
  color: ${({ theme }) => `${theme.colors.primary}`};
  margin-top: 4rem;
`;

const HeroTagline = styled(Title)`
  font-size: 9.6rem;
  line-height: 10.2rem;
  @media (max-width: 768px) {
    font-size: 4.8rem;
    line-height: 5.2rem;
  }
`;

const HeroButton = styled(Button)`
  margin-top: 3.2rem;
`;

const LogoContainer = styled.div`
  direction: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  @media (max-width: 768px) {
  }
`;

const HowSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 14.4rem;
  padding: 0 4.8rem;
  @media (max-width: 768px) {
    flex-basis: 0;
    margin-top: 4.8rem;
    padding: 0 2.4rem;
    width: 100%;
    flex-wrap: wrap;
    word-wrap: break-word;
    min-width: 0;
  }
`;

const HowHeading = styled.h2`
  font-size: 7.2rem;
  line-height: 8.8rem;
  color: ${({ theme }) => `${theme.colors.primary}`};
  margin-bottom: 2.4rem;
  margin-top: 0;
  @media (max-width: 768px) {
    font-size: 5.2rem;
    line-height: 6.2rem;
    word-wrap: break-word;
  }
`;

const HowFeatureGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2.4rem;
  margin-top: 9.6rem;
  /* grid-template-columns: 50% 50%;
  grid-template: "about-image" "about-copy"; */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HowFeature = styled.div`
  display: flex;
  /* flex-basis: 46%; */
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-top: 0.4rem solid ${({ theme }) => `${theme.colors.primary}`};
  @media (max-width: 768px) {
  }
`;

const HowFeatureTitle = styled.h2`
  font-size: 5.6rem;
  line-height: 6.2rem;
  color: ${({ theme }) => `${theme.colors.primary}`};
  margin: 2.4rem 0;
  @media (max-width: 768px) {
    font-size: 4rem;
    line-height: 4.8rem;
    word-wrap: break-word;
  }
`;

const HowFeatureCopy = styled.p`
  font-size: 2rem;
  line-height: 2.8rem;
  color: ${({ theme }) => `${theme.colors.primary}`};
  margin-bottom: 0;
  @media (max-width: 768px) {
    font-size: 2.8rem;
    line-height: 3.2rem;
  }
`;

const HowCopy = styled.p`
  font-size: 3.2rem;
  line-height: 3.8rem;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => `${theme.colors.primary}`};
  margin-bottom: 0;
  @media (max-width: 768px) {
    font-size: 2.8rem;
    line-height: 3.2rem;
  }
`;

const HowAnimationSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 4rem;
`;

const HowAnimationContainer = styled.div`
  width: 100%;
  height: 30rem;
`;

const HowAnimation = styled.img`
  height: 100%;
  width: 100%;
  @media (max-width: 768px) {
    /* padding: 2.4rem;
    height: 100%;
    background-image: url(${heroImageMobile});
    background-position-y: 20rem;
    background-size: cover;
    background-repeat: no-repeat; */
  }
`;

const HowSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 60%;
`;

const HowSubContainerNarrow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 40%;
`;

const FAQImageContainer = styled.div`
  height: 80vh;
  width: 100%;
  background-image: url(${visionImage});
  background-position: "center";
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    /* padding: 2.4rem;
    height: 100%;
    background-image: url(${heroImageMobile});
    background-position-y: 20rem;
    background-size: cover;
    background-repeat: no-repeat; */
  }
`;

const FooterLogoContainer = styled.div`
  direction: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  @media (max-width: 768px) {
  }
`;

const InternalLink = styled.a`
  font-size: 16px;
  line-height: 22px;
  align: center;
  background: transparent;
  color: #000000;
`;

const HomeFooterContainer = styled.div`
  grid-area: footer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-bewteen;
  margin: 4rem 0;
  padding: 0 4.8rem 4.8rem;
  /* background: ${({ theme }) => `${theme.colors.almostWhite}`}; */
  background: transparent;
  t @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2.4rem;
  }
`;

const FooterActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.4rem;
  flex-basis: 32%;
  flex-grow: 1;
  @media (max-width: 768px) {
    margin-top: 8rem;
  }
`;

const HeadlineTickerContainer = styled.div`
  width: 100%;
  height: 14rem;
  background: ${({ theme }) => `${theme.colors.primary}`};
  display: flex;
  align-items: center;
  gap: 4.8rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const TickerItem = styled(Title)`
  color: ${({ theme }) => `${theme.colors.almostWhite}`};
  font-weight: 900;
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
`;
const FooterButton = styled(Button)`
  border-radius: 0.8rem;
  width: 100%;
`;

const HomePage = () => {
  return (
    <StyledMainWrapper>
      <HomeHeaderContainer>
        <LogoContainer>
          <LogoWordmark />
        </LogoContainer>
        <HomeNav />
      </HomeHeaderContainer>
      <StyledBodyContainer>
        <HeroContainer>
          <HeroCTAContainer>
            <HeroHeading size="md" color="primary">
              The Decentralized Publishing Platform.
            </HeroHeading>
            <HeroTagline size="xxxl" color="primary">
              Your Content,
            </HeroTagline>
            <HeroTagline size="xxxl" color="primary">
              Your Community.
            </HeroTagline>
            <Link to={DASHBOARD_URI}>
              <HeroButton color="primary" variant="outlined" size="xl">
                Get Started
              </HeroButton>
            </Link>
          </HeroCTAContainer>
        </HeroContainer>
        <AboutSectionContainer>
          <AboutHeading>
            Publishing that&apos;s truly for creators and their communities.
          </AboutHeading>
          <AboutGrid>
            <AboutImageContainer>
              <AboutImage src={aboutImage} />
            </AboutImageContainer>
            <AboutCopyContainer>
              <AboutCopy>
                HEADLINE is a decentralized publishing platform where a
                creator’s content is always their own. There’s no service fee,
                no long form privacy agreement and your unpublished and token
                gated content is encrypted, enabling access control.
              </AboutCopy>
              <AboutCopy>
                Publish web content and send out newsletters. Build meaningful
                connections with your community and followers. Feel confident
                that the publishing platform you’re using respects what you
                create and who you create it for.
              </AboutCopy>
              <AboutCallout>
                Our excellence is in our collaborations.
              </AboutCallout>
              <AboutCopy>
                Powered by Unlock Protocol and built by Raid Guild, with
                integrations of Ceramic, Lit Protocol & IPFS, HEADLINE is truly
                multi-player, built and maintained by collaboration.
              </AboutCopy>
              <AboutCopy>
                HEADLINE operates as a DAO, decentralized autonomous
                organization. That means that we are run by collective efforts
                and innovation. Join us as we build together.
              </AboutCopy>
            </AboutCopyContainer>
          </AboutGrid>
        </AboutSectionContainer>
      </StyledBodyContainer>
      {/* <HeadlineTickerContainer>
        <TickerItem size="xxl">ADLINE</TickerItem>
        <TickerItem size="xxl">HEADLINE</TickerItem>
        <TickerItem size="xxl">HEADLINE</TickerItem>
        <TickerItem size="xxl">HEADLINE</TickerItem>
        <TickerItem size="xxl">HEA</TickerItem>
      </HeadlineTickerContainer> */}
      <HowSectionContainer>
        <HowHeading>How it works</HowHeading>
        <HowSubContainer>
          <HowCopy>
            When creators own their content, publishing and subscribing
            acknowledges the value of creativity and community.
          </HowCopy>
        </HowSubContainer>
        <HowFeatureGrid>
          <HowFeature>
            <HowFeatureTitle>Your Publication</HowFeatureTitle>
            <HowFeatureCopy>
              Whether an independent creator, member of a DAO or part of a token
              community, create your own publication with a HEADLINE newsletter
              channel. When readers choose to subscribe, your content will
              arrive conveniently in their inbox.
            </HowFeatureCopy>
          </HowFeature>
          <HowFeature>
            <HowFeatureTitle>Your Terms</HowFeatureTitle>
            <HowFeatureCopy>
              Creators choose whether their content is gated or free. Set up a
              paywall and membership tiers.
            </HowFeatureCopy>
          </HowFeature>
          <HowFeature>
            <HowFeatureTitle>Your Place</HowFeatureTitle>
            <HowFeatureCopy>
              Read content from your favorite creators, and create content for
              your own readers, all in one place. Receive freshly published
              content in your inbox and revisit it, at a later date, if you ever
              miss a post.
            </HowFeatureCopy>
            <HowFeatureCopy>
              (Reader’s view will be released in v2)
            </HowFeatureCopy>
          </HowFeature>
        </HowFeatureGrid>
        <HowAnimationSection>
          <HowAnimationContainer>
            <HowAnimation src={getStartedAnimation} alt="" />
          </HowAnimationContainer>
        </HowAnimationSection>
        <HowSubContainerNarrow>
          <HowCopy>
            While we look forward to building more with you, and our friends at
            Unlock and Raid Guild, the V1 release of HEADLINE includes the
            following:
          </HowCopy>
        </HowSubContainerNarrow>
      </HowSectionContainer>
      <FAQImageContainer />
      <FAQSection />
      <HomeFooterContainer>
        <FooterLogoContainer>
          <FullLogo />
        </FooterLogoContainer>
        <FooterActionContainer>
          <Text size="md" color="primary">
            The Decentralized Publishing Platform
          </Text>
          <StyledLink to={DASHBOARD_URI}>
            <FooterButton color="primary" variant="contained" size="md">
              Get Started
            </FooterButton>
          </StyledLink>
        </FooterActionContainer>
      </HomeFooterContainer>
    </StyledMainWrapper>
  );
};

export default HomePage;
