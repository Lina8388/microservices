package ru.team.up.auth.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import ru.team.up.auth.config.jwt.JwtProvider;
import ru.team.up.auth.models.CustomOAuth2User;
import ru.team.up.auth.converters.JavaDateConverter;
import ru.team.up.auth.service.impl.UserDetailsImpl;
import ru.team.up.core.entity.Account;
import ru.team.up.core.entity.Role;
import ru.team.up.core.entity.User;
import ru.team.up.core.repositories.AccountRepository;
import ru.team.up.core.repositories.UserRepository;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Component
public class SuccessHandler implements AuthenticationSuccessHandler {
    private final UserDetailsImpl userService;
    private final JwtProvider jwtProvider;
    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private static String token;

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Autowired
    public SuccessHandler(JwtProvider jwtProvider, UserDetailsImpl userService, AccountRepository accountRepository, UserRepository userRepository) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {

        String email = ((CustomOAuth2User) authentication.getPrincipal()).getEmail();
        Account account = null;

        if (userService.existsByEmail(email)) {
            try {
                account = (Account) userService.loadUserByUsername(email);

                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(
                                SecurityContextHolder.getContext().getAuthentication().getPrincipal(),
                                SecurityContextHolder.getContext().getAuthentication().getCredentials(),
                                Collections.singleton(account.getRole())));
            } catch (UsernameNotFoundException e) {
                httpServletResponse.sendRedirect("/oauth2reg");
                return;
            }
        } else {
            CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            account = accountRepository.findByEmail(email);
            if (account == null) {
                User user = new User();
                user.setRole(Role.ROLE_USER);
                user.setAccountCreatedTime(LocalDate.now());
                user.setLastAccountActivity(LocalDateTime.now());
                user.setEmail(customOAuth2User.getEmail());
                user.setFirstName(customOAuth2User.getName());
                user.setLastName(customOAuth2User.getLastName());
                user.setCity(customOAuth2User.getCity());
                user.setUsername(customOAuth2User.getName());
                user.setBirthday(JavaDateConverter.parserToLocalDate(customOAuth2User.getBirthday()));
                userRepository.save(user);
                account = (Account) userService.loadUserByUsername(user.getEmail());
            }
        }
        token = jwtProvider.generateToken(account.getEmail());
        log.debug("???????????????? ?????????????????????? id: {},  email: {},  JWT: {}", account.getId(), account.getEmail(), token);

        httpServletResponse.sendRedirect("/loginByGoogle");
    }

    public static String getToken() {
        return token;
    }

}

