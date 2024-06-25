import styled, { css, keyframes } from "styled-components";
import { useUserWalletInfoContext } from "@tgs-web-nx/core/features";
import { useAccountStore } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import refreshIcon from "@/assets/t27/images/account/icon-refresh.svg";
import Icon from "@/components/project/Icon";
import { theme } from "@/theme";

const VipProgressWidgetWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  gap: 20px;
  height: 100%;
  align-items: center;

  color: ${({ theme }) => {
    return theme.profileBlockLabel ? theme.profileBlockLabel : "#2b2bb";
  }};

  .padding {
    padding: 20px 30px;
  }

  .content {
    .profile {
      display: flex;
      flex-direction: column;
      gap: 50px;

      .user-info {
        display: flex;
        gap: 20px;
        align-items: flex-end;

        .username {
          margin-bottom: -5px;
          font-size: 60px;
        }

        .vip {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 40px;
          .icon {
            height: 40px;
            width: 40px;
          }
        }
      }

      .progress {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        .progressbar-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
      }
    }

    .progressbar-wrapper {
      display: flex;
      flex-direction: column;

      .status {
        display: flex;
        justify-content: flex-end;
        margin-bottom: -8px;
        font-size: 12px;
        color: ${({ theme }) => theme.white};
      }

      .outer-progressbar {
        display: flex;
        align-items: center;
        .icon {
          width: 32px;
          height: 32px;
          margin-right: -15px;
          z-index: 2;
        }
        .progressbar {
          width: 100%;
          height: 15px;
          background-color: #d9d9d9;
          border-radius: 50px;
          z-index: 0;
          position: relative;

          .fill {
            border-radius: 50px;
            height: 30px;
            z-index: 1;
          }

          .slashed {
            width: 100%;
            border-radius: 50px;
            height: 30px;
            z-index: 2;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }

    .refresh {
      border-radius: 50px;
      height: 60px;
      width: 60px;
      background: ${({ theme }) => theme.primary};
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s ease-in-out;
      cursor: pointer;

      &.alt {
        background: ${({ theme }) => theme.loginRegisterBtnText};

        .icon {
          background: #000;
        }
      }

      &:hover {
        transform: rotate(360deg);
        animation: rotate 2s linear infinite; // Add animation property
      }

      .icon {
        width: 30px;
        height: 30px;
        mask: url(${import.meta.env.BASE_URL + "/assets/images/iconpack/reload.png"}) no-repeat
          center;
        mask-size: contain;
        background: ${({ theme }) => theme.primaryText};
      }
    }

    .wallets {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      font-size: 24px;

      .wallet {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        align-items: center;

        .title {
          font-weight: bold;
          font-size: 24px;
        }

        .balance {
          display: flex;
          text-align: right;
          justify-content: flex-end;
          align-items: center;
          gap: 20px;
        }
      }
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

type RefreshButtonProps = {
  $isLoading: boolean;
};

const rotateKeyFrame = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

export const RefreshButton = styled(Icon)<RefreshButtonProps>`
  cursor: pointer;

  animation: ${({ $isLoading }: RefreshButtonProps) =>
    $isLoading
      ? css`
          ${rotateKeyFrame} 1s linear 0s infinite
        `
      : "none"};

  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;

const VipProgressWidget = () => {
  const { info, isMainWalletLoading } = useUserWalletInfoContext();
  const { getAccountInfo } = useAccountStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ProgressBar = ({ icon, title, current, require, color }: any) => {
    const fill = (current / require) * 100;
    return (
      <div className="progressbar-wrapper">
        <div className="status">
          {i18n.t(title)}:{` ${current} / ${require}`}
        </div>

        <div className="outer-progressbar">
          <img
            className="icon"
            src={`${import.meta.env.BASE_URL}assets/images/vip/${icon}.png`}
            alt={icon}
          />
          <div className="progressbar">
            <div className="fill" style={{ width: fill + "%", background: color }} />
            <img
              className="slashed"
              src={`${import.meta.env.BASE_URL}assets/images/vip/slashed.png`}
              alt="lines"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <VipProgressWidgetWrapper>
      <div className="content">
        <div className="profile">
          <div className="progress">
            <div className="progressbar-container ">
              <ProgressBar
                current={info?.accumdeposit}
                require={info?.levelupaccumulatedeposit}
                color="#844EF8"
                title="vip.totalDeposit"
                icon="coin"
              />
              <ProgressBar
                current={info?.accumturnover}
                require={info?.levelupaccumulatebetamount}
                color={theme.primary}
                title="vip.totalVaildBet"
                icon="dice"
              />
            </div>
            <RefreshButton
              width={"44px"}
              height={"44px"}
              iconUrl={refreshIcon}
              onClick={getAccountInfo}
              $isLoading={isMainWalletLoading}
            />
          </div>
        </div>
      </div>
    </VipProgressWidgetWrapper>
  );
};

export default VipProgressWidget;
