export class Contact {
    constructor(
        public firstName?: string, 
        public lastName?: string, 
        public position?: string,
        public phoneOffice?: string, 
        public faxNumber?: string, 
        public cellular?: string, 
        public email?: string,
        public date_created?: Date,
        public project_id?: Number) {
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    setLastName(lastName: string) {
        this.lastName = lastName;
    }

    setPosition(position: string) {
        this.position = position;
    }

    setPhoneOffice(phoneOffice: string) {
        this.phoneOffice = phoneOffice;
    }

    setFax(faxNumber: string) {
        this.faxNumber = faxNumber;
    }

    setCellular(cellular: string) {
        this.cellular = cellular;
    }

    setEmail(email: string) {
        this.email = email;
    }
}