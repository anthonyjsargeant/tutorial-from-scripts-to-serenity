import {Open, PerformsTasks, Task} from 'serenity-js/protractor';
import { AddATodoItem } from './add_a_todo_item';

export class Start implements Task {
    static withATodoListContaining(items: string[]) {
        return new Start(items);
    }

    performAs(actor: PerformsTasks): PromiseLike<void> {
        return actor.attemptsTo(
            Open.browserOn('examples/angularjs/'),
            ...this.addAll(this.items),
        );
    }

    constructor(private items: string[]) {
    }

    private addAll(items: string[]) {
        return items.map(item => AddATodoItem.called(item));
    }
}
