<template>

  <v-container fluid grid-list-lg>
    <v-layout row wrap>

      <v-flex xs12>
        <p class="title text-xs-center my-4">Add new rating for {{department.name}}</p>
      </v-flex>

      <v-flex xs12>

        <v-text-field
          name="comment"
          label="Comment"
          v-model="rating.comment"
          multiLine
        ></v-text-field>

        <v-stepper v-model="propertyIndex" vertical>

          <div v-for="(property, key,  index) in rating.properties" :key="index">
            <v-stepper-step :step="index + 1" :complete="false">
              {{key}}
            </v-stepper-step>
            <v-stepper-content :step="index + 1">

              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <image-rating class="pt-3" :src="require('../assets/img/star.svg')" v-model="property.rate" :item-size="30" :show-rating="false" :spacing="1"></image-rating>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    v-if="property.rate !== null"
                    name="comment"
                    label="Why?"
                    v-model="property.comment"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-btn color="primary" @click.native="nextStep(index + 1)" :disabled="property.rate === null">Continue</v-btn>
              <v-btn flat :to="{ name: 'ratings', params: { id }}">Cancel</v-btn>

            </v-stepper-content>
          </div>

        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import config from '../config'

export default {
  props: ['id'],
  data () {
    return {
      propertyIndex: 1,
      questions: config.QUESTIONS,
      rating: {
        date: new Date().toISOString(),
        comment: '',
        properties: {}
      }
    }
  },
  computed: {
    department () {
      return this.$store.getters.getDepartmentById(this.id)
    }
  },
  created () {
    for (let i = 0; i < this.questions.length; i++) {
      this.$set(this.rating.properties, this.questions[i], {
        comment: '',
        rate: null
      })
    }
  },
  methods: {
    addRating () {
      console.log('Start add rating', this.rating)
      this.$store.dispatch('addRating', {
        rating: this.rating,
        departmentId: this.id
      })
    },
    nextStep (step) {
      if (step === this.questions.length) {
        this.addRating()
        this.$router.push('/ratings/' + this.id)
      } else {
        this.propertyIndex = step + 1
      }
    }
  }
}
</script>
