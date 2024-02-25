let _selectedIngredient = $state<string | undefined>();

export const selectedIngredient = {
  get value() {
    return _selectedIngredient;
  },
  set value(v: string | undefined) {
    _selectedIngredient = v;
  }
}