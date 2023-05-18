package com.example.websocket.websocketpoc;

public class RateResponse {

    public String currencyPair;
    public double bidRate;
    public double askRate;

    public RateResponse(String currencyPair, double bidRate, double askRate){
        this.currencyPair = currencyPair;
        this.askRate = askRate;
        this.bidRate = bidRate;

    }
}

/*
EUR/USD bid ask
USD/JPY bid ask


class rateresponse{
curpair
bid
ask
}

raterepo{


*/

