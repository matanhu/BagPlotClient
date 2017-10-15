import { ItemProject } from './itemProject';
import { Contact } from './contacts';
export class Project {
    constructor(
        public id: Number,
        public project_name: string,
        public description: string,
        public image?: string,
        public contacts?: Array<Contact>,
        public itemsProject?: Array<ItemProject>,
        public date?: Date,
        public customer_id?: Number)
        {
            this.date = new Date();
        }
    
    setProjectName(project_name: string) {
        this.project_name = project_name;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setImage(image: string) {
        this.image = image;
    }

    setContact(contact: Contact) {
        this.contacts.push(contact);
    }

    setItemProject(itemProject: ItemProject) {
        this.itemsProject.push(itemProject);
    }


}