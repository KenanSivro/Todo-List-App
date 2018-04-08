import Helper from '../helpers/Helper';

const helper = new Helper();

export default class TodoModel {
    constructor(text, completed, completedDate, createdDate, id) {
        this.text = text || '';
        this.createdDate = createdDate || new Date();
        this.completed = completed || false;
        this.completedDate = completedDate || null;
        this.id = id || helper.guidGenerator();
    }
}