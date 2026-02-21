import { Kafka, Producer, Consumer } from "kafkajs";
import logger from "../logging/logger";

const kafka = new Kafka({
    clientId: "sdlc-platform",
    brokers: [process.env.KAFKA_BROKERS || "localhost:9092"],
});

let producer: Producer | null = null;

export const getProducer = async () => {
    if (!producer) {
        producer = kafka.producer();
        await producer.connect();
        logger.info("Kafka Producer Connected");
    }
    return producer;
};

export const emitEvent = async (topic: string, message: any) => {
    try {
        const p = await getProducer();
        await p.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
    } catch (err) {
        logger.error({ err, topic }, "Failed to emit Kafka event");
    }
};

export const createConsumer = async (groupId: string) => {
    const consumer = kafka.consumer({ groupId });
    await consumer.connect();
    return consumer;
};
