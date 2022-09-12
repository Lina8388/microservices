package ru.team.up.notify.controller;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.FluxExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import ru.team.up.notify.entity.Notify;
import ru.team.up.notify.entity.NotifyStatus;
import ru.team.up.notify.repositories.NotifyRepository;
import ru.team.up.notify.service.NotifyService;
import ru.team.up.notify.service.NotifyServiceImpl;
import ru.team.up.notify.utils.RandomString;

import java.time.Duration;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@Slf4j
@AutoConfigureWebTestClient
@ExtendWith(MockitoExtension.class)
@DisplayName("Integration-тесты реактивного контроллера")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class NotifyUserControllerIntegrationTest {

    @Autowired
    private WebTestClient webTestClient;

    @Captor
    ArgumentCaptor<Flux<Notify>> captoredNotifyFlux;

    @Autowired
    @InjectMocks
    NotifyServiceImpl notifyService;

    @Mock
    NotifyRepository notifyRepository;

    @Test
    @DisplayName("Тест реактивного контроллера и сервиса")
    void notifyUserControllerTest() {

        //given
        Notify notifyTest = Notify.builder()
                .text(RandomString.getAlphaNumericString(15))
                .subject(RandomString.getAlphaNumericString(8))
                .email("vasya.pupkin@mail.ru")
                .status(NotifyStatus.NOT_SENT)
                .creationTime(LocalDateTime.now())
                .sentTime(null)
                .build();

        Flux<Notify> notifyTestFlux = Flux.just(notifyTest);

        when(notifyRepository.saveAll(notifyTestFlux)).thenReturn(notifyTestFlux);

        //when
        Flux<Notify> notifyFluxActual = webTestClient
                .post()
                .uri("/notify")
                .contentType(MediaType.APPLICATION_JSON)
                .body(notifyTestFlux, Notify.class)
                .exchange()
                .expectStatus().isCreated()
                .returnResult(Notify.class).getResponseBody();

        Notify notifyActual = notifyFluxActual.blockFirst(Duration.ofSeconds(3));
        log.debug("Actual notify: {}",notifyActual);

        assertThat(notifyActual).isEqualTo(notifyTest);

        //then
        //verify(notifyRepository, times(1)).saveAll(captoredNotifyFlux.capture());
        //assertThat(captoredNotifyFlux.getValue().blockFirst()).isEqualTo(notifyTest);
    }
}
