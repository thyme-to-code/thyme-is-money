import taskList, { setUninvoicedTotals } from '../taskList'

describe('taskList reducer', () => {
  it('sets totals of uninvoiced tasks into state', () => {
    const oldState = {
      uninvoiced: {
        amount: 0,
        hours: 0,
      },
    }
    const action = setUninvoicedTotals({
      tasks: [
        {
          description: 'Go on an adventure.',
          hours: 48,
        },
        {
          description: 'Tell stories by a campfire.',
          hours: 5,
        },
      ],
      rate: 15,
    })
    const newState = taskList(oldState, action)
    expect(newState.uninvoiced.amount).toBe(795)
  })
})
