import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import config from "@tgs-web-nx/config";
import { walletAction } from "@tgs-web-nx/core";
import MainT1 from "./T1/MainTamplate";

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
  }, [props.cardList, props.defaultCard]);

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
    <MainT1
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
