import { shallowMount } from '@vue/test-utils'
import landing from '../src/views/landing.vue'

describe('landing.vue', () => {
  it('Checking <h1> tag text', () => {
    const wrapper = shallowMount(landing)
    console.log(wrapper)
    const h1 = wrapper.find('h1')
    expect(h1.text()).toBe('hardeman')
  })
})
