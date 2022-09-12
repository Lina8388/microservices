package ru.team.up.teamup.kafkaTestContainers;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.testcontainers.containers.KafkaContainer;
import org.testcontainers.utility.DockerImageName;
import ru.team.up.teamup.entity.Report;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Slf4j
@TestConfiguration
//@Component
//@TestPropertySource("classpath:application.properties")
//@PropertySource("classpath:application.properties")
//@ConfigurationProperties("classpath:application.properties")
//@SpringApplicationConfiguration(classes = ExampleApplication.class)
//@PropertySource("classpath:test.properties")
//@TestPropertySource(locations = {"classpath:test.properties"})
//@ExtendWith(SpringExtension.class)
public class KafkaTestConfiguration {

    //@Value(value = "${kafka.topic.name}")
    private String topicName;

    //@Value(value = "${kafka.partitions}")
    private int partitions;

    //@Value(value = "${kafka.replicationFactor}")
    private short replicationFactor;

    private final KafkaContainer kafka = new KafkaContainer(DockerImageName.parse("confluentinc/cp-kafka:6.2.1"));

    //private String bootstrapServers;

    @Bean
    public KafkaAdmin kafkaAdmin(){
        kafka.start();
        Map<String, Object> config = new HashMap<>();
        config.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, kafka.getBootstrapServers());
        return new KafkaAdmin(config);
    }

    @Bean
    public NewTopic kafkaTestTopic(){

        ClassLoader loader = Thread.currentThread().getContextClassLoader();
        Properties properties = new Properties();
        try (InputStream resourceStream = loader.getResourceAsStream("application.properties")) {
            properties.load(resourceStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

        topicName = properties.getProperty("kafka.topic.name");
        partitions = Integer.parseInt(properties.getProperty("kafka.partitions"));
        replicationFactor = (short)Integer.parseInt(properties.getProperty("kafka.replicationFactor"));
        log.debug("topic name: {}", topicName);
        //System.out.println("Here.. topic name:"+topicName);
        return new NewTopic(topicName, partitions, replicationFactor);
    }

    @Bean
    public KafkaConsumer<String, Report> kafkaTestConsumer(){

        Properties properties = new Properties();
        properties.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaAdmin().getConfigurationProperties()
                .get(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG));
        properties.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        properties.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class.getName());
        properties.put(JsonDeserializer.TRUSTED_PACKAGES, "*");
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "consuming");
        properties.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");

        KafkaConsumer<String, Report> kafkaTestConsumer = new KafkaConsumer<>(properties);

        kafkaTestConsumer.subscribe(Collections.singleton(topicName));

        return kafkaTestConsumer;
    }

    @Bean
    public KafkaProducer<String, Report> kafkaTestProducer() {

        Properties properties = new Properties();
        properties.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaAdmin().getConfigurationProperties()
                .get(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG));
        properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class.getName());
        properties.put(ProducerConfig.ACKS_CONFIG, "1");

        KafkaProducer<String, Report> kafkaTestProducer = new KafkaProducer<>(properties);

        return kafkaTestProducer;
    }
}
