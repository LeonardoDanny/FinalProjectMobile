import { Component, ElementRef, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import {
  NavParams,
  ActionSheetController,
  AlertController,
  ToastController, NavController, Platform
} from "ionic-angular";
import {Camera,CameraResultType,CameraSource,Capacitor, Filesystem} from '@capacitor/core'

import { RecipesService } from "../../services/recipes";
import { Recipe } from "../../models/recipe";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {

  photo: SafeResourceUrl;
  isDesktop: Boolean;
  local_photo:any;

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;
  filePickerRef: any;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipesService: RecipesService,
              private navCtrl: NavController,
              private platform: Platform,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if( (this.platform.is('mobile') && this.platform.is('hybrid'))|| this.platform.is('desktop')){
      this.isDesktop = true
    }

    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }
  async getPicture(type:String) {
    console.log("get picture")
    if(!Capacitor.isPluginAvailable('Camera')|| (this.isDesktop && type === 'gallery')){
      this.filePickerRef.nativeElement.click();
      return;
    }


    const image = await Camera.getPhoto({
      quality:100,
      width:300,
      allowEditing:false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    })
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
    this.local_photo = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl)));

  } 
  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }
    if (this.mode == 'Edit') {
      this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients,this.local_photo);
    } else {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients,this.local_photo);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All Ingredients were deleted!',
                duration: 1500,
                position: 'top'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid value!',
                duration: 1500,
                position: 'top'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Item added!',
              duration: 1500,
              position: 'top'
            });
            toast.present();
          }
        }
      ]
    });
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }
}
