import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { connect } from "react-redux";
import config from "@tgs-web-nx/config";
import { accountAction, walletAction, WalletService, RESET_WALLETRESULT } from "@tgs-web-nx/core";
import { MainTemplate } from "./withdrawal";
import LimitPopupBigPNG from "@/assets/images/limit-popup-big.png";
import IconEditPNG from "@/assets/images/icon-edit.png";
import IconBankDisablePNG from "@/assets/images/icon-bank-disable.png";
styled(Grid)`
  width: auto;
  text-align: left;

  height: 41px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;
  padding-right: 10px;
  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      `
      : ` border: solid 1px #e1dfdf;
     `};
  &:hover {
    cursor: pointer;
  }
`;
styled(Grid)`
  width: 40px;
  height: 40px;
  background: url(${IconBankDisablePNG}) no-repeat 15px center;
`;
const BankCardButtonCardNo = styled.div`
  float: right;
  margin-right: 2px;
`;
styled(BankCardButtonCardNo)`
  font-weight: bold;
`;
styled(Grid)`
  height: 41px;
  width: auto;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;
  padding-right: 10px;
  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      `
      : ` border: solid 1px #e1dfdf;
     `};
  &:hover {
    cursor: pointer;
  }
`;

styled(Grid)`
  width: 40px;
  height: 40px;
  background: url(${IconEditPNG}) no-repeat 15px center;
`;

const Main = (props) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(props.defaultCard);
  const [amount, setAmount] = useState("");

  const [disabled, setDisabled] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [fee, setFee] = useState(0);
  const [paymentList, setPaymentList] = useState(props.wallet.withdrawalList);
  const [exchangeRate, setExchangeRate] = useState(config.features.Withdrawal_USDT_ExchangeRate);
  const [playerNote, setPlayerNote] = useState("");
  var minValue = [];
  var maxValue = [];
  useEffect(() => {
    if (config.features.Deposit_AddCard && props.cardList.length > 0) {
      getTransferLimit(props.cardList[props.defaultCard].paymentchannelid);
    }
  }, [props.defaultCard]);

  const handleSelectCardChange = (index) => {
    setSelectedCardIndex(index);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handlePlayerNote = (e) => {
    setPlayerNote(e.target.value);
  };

  const handleWithdrawalClick = (e) => {
    props.onhandleWithdrawalClick(
      props.cardList[selectedCardIndex].id,
      amount,
      undefined,
      playerNote,
    );
    setDisabled(true);

    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  const getTransferLimit = (channelId) => {
    //reset everything
    minValue = [];
    maxValue = [];
    setMin(0);
    setMax(0);
    setFee(0);
    //update new data.
    for (var i = 0; i < paymentList.length; i++) {
      const methodList = paymentList[i].channel;
      if (methodList) {
        for (var inner = 0; inner < methodList.length; inner++) {
          const channelList = methodList[inner];
          if (channelList.channelid === channelId) {
            minValue.push(channelList.transferlimit.from);
            maxValue.push(channelList.transferlimit.to);
            setMin(Math.min(...minValue));
            setMax(Math.max(...maxValue));
            setFee(channelList.fees);
          }
        }
      }
    }
  };

  return (
    <MainTemplate
      template={config.accountTemplate}
      amount={amount}
      playerNote={playerNote}
      min={min}
      max={max}
      disabled={disabled}
      exchangeRate={exchangeRate}
      cardList={props.cardList}
      minWithdrawLimit={props.minWithdrawLimit}
      selectedCardIndex={selectedCardIndex}
      handleSelectCardChange={handleSelectCardChange}
      getTransferLimit={getTransferLimit}
      onhandleManageCardClick={props.onhandleManageCardClick}
      performWithdrawFromEveryBrand={props.performWithdrawFromEveryBrand}
      onhandleRefreshClick={props.onhandleRefreshClick}
      handleAmountChange={handleAmountChange}
      handlePlayerNote={handlePlayerNote}
      handleWithdrawalClick={handleWithdrawalClick}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    performWithdrawFromEveryBrand: () => dispatch(walletAction.performWithdrawFromEveryBrand()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

//test
