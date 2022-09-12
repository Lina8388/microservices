package ru.team.up.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
public class ModeratorDto extends AccountDto{

    /**
     * количество закрытых обращений
     */
    private Long amountOfClosedRequests;

    /**
     * количество проверенных мероприятий
     */
    private Long amountOfCheckedEvents;

    /**
     * количество удалённых мероприятий
     */
    private Long amountOfDeletedEvents;

}
