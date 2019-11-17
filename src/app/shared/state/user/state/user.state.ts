import { User } from 'src/app/shared/models/user.model';

export interface UserState {
    user: User;
    successMessage: string | null,
    errorMessage: string | null;
}