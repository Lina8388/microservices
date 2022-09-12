package ru.team.up.notify.controller;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.client.ReactorNettyWebSocketClient;
import org.springframework.web.reactive.socket.client.WebSocketClient;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.time.Duration;

@RestController
@RequestMapping("/websockettest")
@Slf4j
public class WebSocketTest {

    @SneakyThrows
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public void testWebSocket() {

        log.debug("------------> Testing web socket client");
        WebSocketClient client = new ReactorNettyWebSocketClient();

        URI url = new URI("ws://localhost:8085/websocket");

        client.execute(url, session ->
                session.receive()
                        .doOnNext(webSocketMessage -> log.debug(webSocketMessage.getPayloadAsText()))
                        .then());

        client.execute(
                        URI.create("ws://localhost:8085/websocket"),
                        session -> session.send(
                                        Mono.just(session.textMessage("Hi from websocket!!")))
                                .thenMany(session.receive()
                                        .map(WebSocketMessage::getPayloadAsText)
                                        .doOnNext(log::debug))
                                .then());

        log.debug("------------> Web socket client has been tested");

    }
}
