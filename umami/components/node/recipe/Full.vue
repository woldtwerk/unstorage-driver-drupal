<script setup lang="ts">
import type { NodeRecipeFullInterface } from '~/schemas'

const { pageProps } = defineProps<{
  pageProps: NodeRecipeFullInterface
}>()

definePageMeta({
  hideTitle: true,
})
</script>

<template>
  <article class="node node--type-recipe node--promoted node--view-mode-full">
    <header class="node__header">
      <h1 class="page-title">
        <span class="field field--name-title field--type-string field--label-hidden">
          {{ pageProps.title }}
        </span>
      </h1>
    </header>

    <div class="node__content">
      <LayoutOneColumn>
        <div class="label-items field field--name-field-recipe-category field--type-entity-reference field--label-inline clearfix">
          <div class="field__label">
            Recipe Category:
          </div>
          <div class="field__items">
            <TaxonomyTermLabel
              v-for="category in pageProps.categories"
              :key="category.id"
              v-bind="category"
              :locale="pageProps.locale"
            />
          </div>
        </div>
        <div
          class="label-items field field--name-field-tags field--type-entity-reference field--label-inline clearfix"
        >
          <div class="field__label">
            Tags
          </div>
          <div class="field__items">
            <TaxonomyTermLabel
              v-for="tag in pageProps.tags"
              :key="tag.id"
              v-bind="tag"
              :locale="pageProps.locale"
            />
          </div>
        </div>
        <div class="field--name-field-summary" v-html="pageProps.summary" />
      </LayoutOneColumn>
      <LayoutOnePlusFour>
        <template #first>
          <div v-if="pageProps.media" class="field--name-field-media-image">
            <MediaImage v-bind="pageProps.media" />
          </div>
        </template>
        <template #second>
          <div class="field--name-field-preparation-time">
            <div class="field__label">
              {{ $t('Preparation time') }}:
            </div>
            <div class="field__item" :content="pageProps.preparationTime">
              {{ pageProps.preparationTime }} {{ $t(' minutes') }}
            </div>
          </div>
        </template>
        <template #third>
          <div class="field--name-field-cooking-time">
            <div class="field__label">
              {{ $t('Cooking time') }}:
            </div>
            <div class="field__item" :content="pageProps.cookingTime">
              {{ pageProps.cookingTime }} {{ $t(' minutes') }}
            </div>
          </div>
        </template>
        <template #fourth>
          <div class="field--name-field-number-of-servings">
            <div class="field__label">
              {{ $t('Number of servings') }}:
            </div>
            <div class="field__item" :content="pageProps.numberOfServings">
              {{ pageProps.numberOfServings }}
            </div>
          </div>
        </template>
        <template #fifth>
          <div class="field--name-field-difficulty">
            <div class="field__label">
              {{ $t('Difficulty') }}:
            </div>
            <div class="field__item" :content="pageProps.difficulty">
              {{ $t(capitalizeFirstLetter(pageProps.difficulty)) }}
            </div>
          </div>
        </template>
      </LayoutOnePlusFour>
      <LayoutTwoColumn cols="33-67">
        <template #first>
          <div class="field--name-field-ingredients">
            <div class="field__label">
              Ingredients
            </div>
            <div class="field__items">
              <div
                v-for="item in pageProps.ingredients"
                :key="item"
                class="field__item"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </template>
        <template #second>
          <div class="field--name-field-recipe-instruction">
            <div class="field__label">
              Directions
            </div>
            <div class="field__item" v-html="pageProps.instructions" />
          </div>
        </template>
      </LayoutTwoColumn>
      <LayoutOneColumn>
        <BlockRelatedRecipes
          v-bind="{
            locale: pageProps.locale,
            id: pageProps.id,
          }"
        />
      </LayoutOneColumn>
    </div>
  </article>
</template>
