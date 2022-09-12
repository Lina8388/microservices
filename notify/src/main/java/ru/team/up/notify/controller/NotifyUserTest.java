package ru.team.up.notify.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import ru.team.up.notify.entity.Notify;
import ru.team.up.notify.entity.NotifyStatus;
import ru.team.up.notify.repositories.NotifyRepository;
import ru.team.up.notify.service.EmailNotifyService;
import ru.team.up.notify.utils.RandomString;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/notifyuser")
@Slf4j
public class NotifyUserTest {

    @Autowired
    NotifyRepository notifyRepository;

    @Autowired
    EmailNotifyService emailNotifyService;

    @GetMapping("/sendall")
    @ResponseStatus(HttpStatus.OK)
    public void sendAllNotofications(){
        emailNotifyService.sendNotifys();
    }

    @GetMapping("/updateall")
    @ResponseStatus(HttpStatus.OK)
    public void updateAllNotofications(){

        notifyRepository.saveAll(notifyRepository.findAllByStatusEquals(NotifyStatus.SENT)
                .map(n -> {n.setStatus(NotifyStatus.NOT_SENT); return n;})).subscribe();
    }

    @GetMapping("/send")
    @ResponseStatus(HttpStatus.OK)
    public void sendNotofications(){

        LocalDateTime localDateTime = LocalDateTime.now();

        Notify notify = Notify.builder()
                .text(RandomString.getAlphaNumericString(15))
                .subject(RandomString.getAlphaNumericString(8))
                .email("dmitry.koryanov@yandex.ru")
                .status(NotifyStatus.NOT_SENT)
                .creationTime(localDateTime)
                .sentTime(localDateTime)
                .build();

        Mono<Notify> notifyMono = Mono.just(notify);

        Mono<Notify> savedNotifyMono = notifyRepository.saveAll(notifyMono).next();

        savedNotifyMono.subscribe();

        /*savedNotifyMono.subscribe(n -> emailNotifyService.sendNotify(n), e -> log.debug(e.getMessage()), () -> {
            log.debug("Сохраняем изменения в уведомлении..");
            notify.setStatus(Notify.Status.SENT);
            notify.setSentTime(LocalDateTime.now());
            notifyRepository.save(notify).subscribe();
        });*/
    }
}
