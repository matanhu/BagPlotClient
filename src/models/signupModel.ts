export class SignupModel {
    constructor(
        public firstName?: string,
        public lastName?: string,
        public cellular?: string,
        public email?: string,
        public password?: string,
        public passwordAgain?: string
    ) {
        this.firstName = '';
        this.lastName = '';
        this.cellular = '';
        this.email = '';
        this.password = '';
        this.passwordAgain = '';
    }
}