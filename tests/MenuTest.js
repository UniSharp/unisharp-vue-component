const assert = require('assert')
const Menu = require('../plugins/Menu').default

describe('Menu', () => {
  describe('#normalize()', () => {
    it('Basic normalize.', () => {
      assert.deepEqual(
        [{ title: 'foo', to: '/foo', matched: '/foo' }],
        Menu.normalize([{ title: 'foo', to: '/foo' }])
      )
    })

    it('Normalize with children', () => {
      assert.deepEqual(
        [{ title: 'foo', to: '/foo', matched: '/foo' }, { title: 'bar', to: '/bar', matched: '/bar' }],
        Menu.normalize([{ title: 'index', children: [{ title: 'foo', to: '/foo' }, { title: 'bar', to: '/bar' }] }])
      )
    })

    it('Normalize with active', () => {
      assert.deepEqual(
        [{ title: 'index', to: '/', matched: '/' }, { title: 'index', to: '/', matched: '/foo' }, { title: 'index', to: '/', matched: '/bar' }],
        Menu.normalize([{ title: 'index', to: '/', active: ['/foo', '/bar'] }])
      )
    })

    it('Normalize with not array', () => {
      assert.deepEqual(
        [{ title: 'foo', to: '/foo', matched: '/foo' }],
        Menu.normalize({ title: 'foo', to: '/foo' })
      )
    })
  })

  describe('#getVisible', () => {
    it('Get visible menu by show', () => {
      let menu = new Menu([
        { title: 'foo', show: true, to: '/foo' },
        { title: 'bar', show: false, to: '/bar' },
        { title: 'foo', to: '/bar' },
        { title: 'foo', to: '/foo', children: [{ title: 'children', show: false, to: '/children' }] },
        { title: 'bar', show: false, to: '/bar', children: [{ title: 'children', show: true, to: '/children' }] }
      ])

      assert.deepEqual(
        [
          { title: 'foo', show: true, to: '/foo' },
          { title: 'foo', to: '/bar' },
          { title: 'foo', to: '/foo', children: [] }
        ],
        menu.getVisible()
      )
    })
  })

  describe('#getCurrent()', () => {
    it('Basic get current.', () => {
      let menu = new Menu([{ title: 'foo', to: '/foo' }, { title: 'bar', to: '/bar' }])

      assert.deepEqual(
        { title: 'foo', to: '/foo', matched: '/foo' },
        menu.getCurrent({ matched: [{ path: '/foo' }] })
      )
    })

    it('Get current with children.', () => {
      let menu = new Menu([{
        title: 'index',
        children: [{ title: 'foo', to: '/foo' }, { title: 'bar', to: '/bar' }]
      }])

      assert.deepEqual(
        { title: 'foo', to: '/foo', matched: '/foo' },
        menu.getCurrent({ matched: [{ path: '/foo' }] })
      )
    })

    it('Get current with active.', () => {
      let menu = new Menu([{
        title: 'index',
        to: '/',
        active: ['/foo', '/bar']
      }])

      assert.deepEqual(
        { title: 'index', to: '/', matched: '/foo' },
        menu.getCurrent({ matched: [{ path: '/foo' }] })
      )
    })

    it('Get current with params.', () => {
      let menu = new Menu([{ title: 'foo', to: '/foo/:id' }, { title: 'bar', to: '/bar/:id' }])

      assert.deepEqual(
        { title: 'foo', to: '/foo/:id', matched: '/foo/:id' },
        menu.getCurrent({ matched: [{ path: '/foo/:id' }] })
      )
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
