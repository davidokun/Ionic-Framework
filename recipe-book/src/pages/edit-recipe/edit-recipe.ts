import {Component, OnInit} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  private mode = 'New';
  private selectOptions = ['Easy', 'Medium', 'Hard'];
  private recipeForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private actionSheetCtrl: ActionSheetController) {}

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {

          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {

          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl(this.selectOptions[1], Validators.required)
    });
  }
}
