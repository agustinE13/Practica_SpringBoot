import { Component, OnInit } from '@angular/core';
import { CrudService } from './api/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 
  
})

export class AppComponent implements OnInit {
  recipes: any []=[]
  form: FormGroup
  recipe ={
    id:null,
    title: '',
    ingredients: [],
    time:  '',
    difficulty_level:'',
    images: '',
    video: ''
    //ingredientes:[]
  }
  showAllIngredients = false;
  searchKeyword: string = '';
  constructor(private appService:CrudService, private fb: FormBuilder){
    this.form=this.fb.group({
      title:['',Validators.required],
      ingredients:['',Validators.required],
      time:['',Validators.required],
      difficulty_level:['',Validators.required],
      images:['',Validators.required],
      video:['',Validators.required]
     // ingredients: this.fb.array([''], Validators.required)
    })
  }
  
  ngOnInit(): void {
      this.getall()
  }
  getall() {
    if (this.searchKeyword.trim() !== '') {
      this.search();
    } else {
      this.appService.getRecipes().subscribe((data: any) => (this.recipes = data));
    }
  }
  new() {
    if (this.form.valid) {
      const newRecipe = {
        id: this.recipe.id,
        title: this.form.get('title')?.value || '',
        ingredients: (this.form.get('ingredients')?.value || '').split('\n').map((ingredient: string) => ingredient.trim()),
        time: this.form.get('time')?.value || '',
        difficulty_level: this.form.get('difficulty_level')?.value || '',
        images: this.form.get('images')?.value || '',
        video: this.form.get('video')?.value || ''
      };
      
      if (newRecipe.id) {
        this.appService.update(newRecipe.id, newRecipe).subscribe(() => this.getall());
      } else {
        this.appService.create(newRecipe).subscribe(() => this.getall());
      }
      
      this.form.reset();     
  
      // Crea una nueva instancia de this.recipe
      this.recipe ={
        id:null,
        title: '',
        ingredients: [],
        time:  '',
        difficulty_level:'',
        images: '',
        video: ''
      }
    }
}
  edit(recipe: any){
    this.recipe={
      ...recipe
    }
    this.form.patchValue({
      id:this.recipe.id,
      title: this.recipe.title,
      ingredients: this.recipe.ingredients.join('\n'),
      time: this.recipe.time,
      difficulty_level: this.recipe.difficulty_level,
      images: this.recipe.images,
      video: this.recipe.video
    });
  }
  
  delete(recipe: any){
    this.appService.delete(recipe.id).subscribe(()=>this.getall())
  }
  search() {
    this.appService.searchRecipes(this.searchKeyword).subscribe((data: any) => (this.recipes = data));
  }
  toggleShowAllIngredients() {
    this.showAllIngredients = !this.showAllIngredients;
  } 
  title = 'crud';
}


