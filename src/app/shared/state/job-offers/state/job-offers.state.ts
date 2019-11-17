import { Offer } from 'src/app/shared/models/offer.model';

export interface JobOffersState {
    offers: Offer[],
    errorMessage: string | null;
}
