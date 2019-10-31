import {protractor} from 'protractor';
import {Actor, BrowseTheWeb} from 'serenity-js/protractor';
import {expect} from '../../spec/expect';
import {TodoList} from '../../spec/screenplay/components/todo_list';
import {AddATodoItem} from '../../spec/screenplay/tasks/add_a_todo_item';
import {Start} from '../../spec/screenplay/tasks/start';
import {listOf} from '../../spec/text';

export = function todoUserSteps() {

    this.setDefaultTimeout(30 * 1000);  // The todomvc.com website can sometimes be a bit slow to load, so we tell
                                        // Cucumber to give it up to 30 seconds to get ready.

    let actor: Actor;

    this.Given(/^.*that (.*) has a todo list containing (.*)$/, function(actorName: string, items: string) {
        actor = Actor.named(actorName).whoCan(BrowseTheWeb.using(protractor.browser));

        return actor.attemptsTo(
            Start.withATodoListContaining(listOf(items)),
        );
    });

    this.When(/^s?he adds (.*?) to (?:his|her) list$/, function(itemName: string) {
        return actor.attemptsTo(
            AddATodoItem.called(itemName),
        );
    });

    this.Then(/^.* todo list should contain (.*?)$/, function(items: string) {
        return expect(actor.toSee(TodoList.Items_Displayed)).eventually.deep.equal(listOf(items));
    });
};
