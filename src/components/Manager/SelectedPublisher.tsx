import { getPublisher } from "../../stores/PublisherStore";

export const SelectedPublisher = async () => {
    const publisher = await getPublisher('');
    return publisher.map(value => ({
        value: value.pu_name,
        label: value.pu_name
    }));
}
