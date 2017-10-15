export class ItemProject {
    constructor(
        public id?: number,
        public project_item_name?: string,
        public description?: string,
        public image?: string,
        public date_created?: Date,
        public project_id?: number
    ) {}

    setName(project_item_name: string) {
        this.project_item_name = project_item_name;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setImage(image: string) {
        this.image = image;
    }
} 