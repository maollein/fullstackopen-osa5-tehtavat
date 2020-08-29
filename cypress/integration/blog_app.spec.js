describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request(
      'POST',
      'http://localhost:3001/api/users',
      { username: 'test_user', password: 'test_user', name: 'test_user' }
    );
    cy.request(
      'POST',
      'http://localhost:3001/api/users',
      { username: 'test_user_2', password: 'test_user_2', name: 'test_user_2' }
    );
    cy.visit('http://localhost:3000');
  });

  it('Login from is shown', function () {
    cy.get('#login-form').contains('Username');
  });

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#login-username-input').type('test_user');
      cy.get('#login-password-input').type('test_user');
      cy.get('#login-btn').click();
      cy.contains('test_user logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#login-username-input').type('wrong_user');
      cy.get('#login-password-input').type('wrong_user');
      cy.get('#login-btn').click();
      cy.contains('Invalid username or passwor')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test_user', password: 'test_user' });
    });

    it('A blog can be created', function () {
      cy.get('input[value*="Add blog"]').click();
      cy.get('#add-blog-title').type('Test title');
      cy.get('#add-blog-author').type('Test author');
      cy.get('#add-blog-url').type('Test url');
      cy.get('#add-blog-btn').click();
      cy.contains('Blog added');
    });

    describe('And a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Test title', author: 'Test author', url: 'Test url' });
      });

      it('A created blog can be liked', function () {
        cy.contains('Test title')
          .get('input[value*="view"]').click();
        cy.get('input[value*="like"]').click();
        cy.contains('likes 1');
      });

      it('A created blog can be deleted', function () {
        cy.contains('Test title')
          .get('input[value*="view"]').click();
        cy.get('input[value*="delete"]').click();
        cy.contains('Blog deleted');
      });

      it('Delete blog button is not shown to other users', function () {
        cy.login({ username: 'test_user_2', password: 'test_user_2' });
        cy.contains('Test title')
          .get('input[value*="view"]').click();
        cy.get('input[value*="delete"]').should('not.exist');
      });

      it.only('Blogs are ordered in decending order by likes', function () {
        cy.createBlog({ title: 'Test1', author: 'Test1', url: 'Test1', likes: 7 });
        cy.createBlog({ title: 'Test2', author: 'Test2', url: 'Test2', likes: 4 });
        cy.createBlog({ title: 'Test3', author: 'Test3', url: 'Test3', likes: 14 });
        cy.get('#blogs-list').children().then(blogsList => {
          expect(blogsList.eq(0)).to.contain('Test3');
          expect(blogsList.eq(1)).to.contain('Test1');
          expect(blogsList.eq(2)).to.contain('Test2');
          expect(blogsList.eq(3)).to.contain('Test title');
        });
      });
    });
  });
});