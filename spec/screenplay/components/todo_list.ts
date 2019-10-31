import { by } from 'protractor';
import {Question, Target, Text} from 'serenity-js/protractor';

export class TodoList {
    static get Items_Displayed(): Question<PromiseLike<string[]>> {
        return this._Items_Displayed;
    }

    static set Items_Displayed(value: Question<PromiseLike<string[]>>) {
        this._Items_Displayed = value;
    }

    static What_Needs_To_Be_Done = Target.the('"What needs to be done?" input box')
        .located(by.model('newTodo'));

    static Items = Target.the('List of Items').located(by.repeater('todo in todos'));

    private static _Items_Displayed = Text.ofAll(TodoList.Items);
}
