const assert = require('assert')
const Menu = require('../plugins/Menu').default

describe('Menu', () => {
  describe('#normalize()', () => {
    it('Basic normalize.', () => {
      assert.deepEqual([{ title: 'foo', to: '/foo' }], Menu.normalize([{ title: 'foo', to: '/foo' }]))
    })

    it('Normalize with children', () => {
      assert.deepEqual(
        [{ title: 'foo', to: '/foo' }, { title: 'bar', to: '/bar' }],
        Menu.normalize([{ title: 'index', children: [{ title: 'foo', to: '/foo' }, { title: 'bar', to: '/bar' }] }])
      )
    })

    it('Normalize with active', () => {
      assert.deepEqual(
        [{ title: 'index', to: '/foo' }, { title: 'index', to: '/bar' }],
        Menu.normalize([{ title: 'index', active: ['/foo', '/bar'] }])
      )
    })

    it('Normalize with not array', () => {
      assert.deepEqual(
        [{ title: 'foo', to: '/foo' }],
        Menu.normalize({ title: 'foo', to: '/foo' })
      )
    })
  })

  describe('#getCurrent()', () => {
    it('Basic get current.', () => {
      let expected = { title: 'foo', to: '/foo' }
      let menu = new Menu([expected, { title: 'bar', to: '/bar' }])

      assert.deepEqual(expected, menu.getCurrent({ matched: [{ path: '/foo' }] }))
    })

    it('Get current with children.', () => {
      let expected = { title: 'foo', to: '/foo' }
      let menu = new Menu([{
        title: 'index',
        children: [expected, { title: 'bar', to: '/bar' }]
      }])

      assert.deepEqual(expected, menu.getCurrent({ matched: [{ path: '/foo' }] }))
    })

    it('Get current with active.', () => {
      let menu = new Menu([{
        title: 'index',
        to: '/',
        active: ['/foo', '/bar']
      }])

      assert.deepEqual({ title: 'index', to: '/foo' }, menu.getCurrent({ matched: [{ path: '/foo' }] }))
    })

    it('Get current with params.', () => {
      let expected = { title: 'foo', to: '/foo/:id' }
      let menu = new Menu([expected, { title: 'bar', to: '/bar/:id' }])

      assert.deepEqual(expected, menu.getCurrent({ matched: [{ path: '/foo/:id' }] }))
    })
  })

  describe('#isActive()', () => {
    it('Basic check.', () => {
      assert.ok(Menu.isActive({ to: '/foo' }, { matched: [{ path: '/foo' }] }))
      assert.ok(!Menu.isActive({ to: '/bar' }, { matched: [{ path: '/foo' }] }))
    })

    it('Check with active.', () => {
      assert.ok(Menu.isActive({ active: ['/foo'] }, { matched: [{ path: '/foo' }] }))
      assert.ok(!Menu.isActive({ active: ['/bar'] }, { matched: [{ path: '/foo' }] }))
    })

    it('Check with children.', () => {
      assert.ok(Menu.isActive({ children: [{ to: '/foo' }] }, { matched: [{ path: '/foo' }] }))
      assert.ok(!Menu.isActive({ children: [{ to: '/bar' }] }, { matched: [{ path: '/foo' }] }))
    })

    it('Check with children and active.', () => {
      assert.ok(Menu.isActive({ children: [{ active: ['/foo'] }] }, { matched: [{ path: '/foo' }] }))
      assert.ok(!Menu.isActive({ children: [{ active: ['/bar'] }] }, { matched: [{ path: '/foo' }] }))
    })
  })
})
