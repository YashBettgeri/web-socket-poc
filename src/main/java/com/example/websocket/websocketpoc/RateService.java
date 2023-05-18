package com.example.websocket.websocketpoc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
@EnableScheduling
public class RateService {

    @Autowired
    private SimpMessagingTemplate simpleMessagingTemplate;

    @Scheduled(fixedRate = 2000)
    public void publishLivePrices() {
        //List<StockResponse> liveNiftyStockPrices = realTimeStockPriceFetcher.fetchLiveNiftyStockPrices();


        List<RateResponse> responses = new ArrayList<>();
        DecimalFormat df = new DecimalFormat("#.####");
        double eurusd = Math.random()*0.001 + 1.0819d;
        double usdjpy = Math.random()*0.1 + 137.2370d;
        double usdcad = Math.random()*0.001 + 1.3479d;
        double pip = 0.0001d;
        responses.add(new RateResponse("EUR/USD", Double.valueOf(df.format(eurusd)) ,Double.valueOf(df.format(eurusd)) + 4*pip));
        responses.add(new RateResponse("USD/JPY", Double.valueOf(df.format(usdjpy)) ,Double.valueOf(df.format(usdjpy)) + 400*pip));
        responses.add(new RateResponse("USD/CAD", Double.valueOf(df.format(usdcad)) ,Double.valueOf(df.format(usdcad)) + 4*pip));


        simpleMessagingTemplate.convertAndSend("/topic/live-rates", responses );
    }

}
