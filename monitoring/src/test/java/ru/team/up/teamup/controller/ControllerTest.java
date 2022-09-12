package ru.team.up.teamup.controller;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import ru.team.up.teamup.entity.Admin;
import ru.team.up.teamup.entity.Role;
import ru.team.up.teamup.repositories.AdminRepository;
import ru.team.up.teamup.service.UserDetailsImpl;

import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/*@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@WithUserDetails("testuser")*/
public class ControllerTest {

/*    @Autowired
    private MockMvc mockMvc;

    @Autowired
    AdminRepository adminTestRepository;

    @Autowired
    private UserDetailsImpl userDetails;

    private Admin admin;

    //@BeforeAll
    void beforeAll() {
        admin = Admin.builder()
                .id(-1L)
                .password("123")
                .username("testuser")
                .role(Role.ROLE_ADMIN)
                .build();

        userDetails.save(admin);
    }

    //@AfterAll
    void afterAll() {
        adminTestRepository.deleteById(admin.getId());
    }

    //@Test
    //@Disabled
    //@DisplayName("Пользователь с неправильным логином и паролем не может войти в систему.")
    void adminPage() throws Exception {
        mockMvc
                .perform(get("/admin/"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(authenticated());
    }*/
}
