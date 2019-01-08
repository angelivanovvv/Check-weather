import sendRequest from './api-request';
import $ from 'jquery';
import Handlebars from 'handlebars';

class GenerateTemplates {
  constructor() {
    this.Head = $('#head-template');
    this.HeadWrapper = $('.head-wrapper');
    this.Body = $('#body-template');
    this.BodyFirstDiv = $('.body-wrapper div');
    this.BodyWrapper = $('.body-wrapper');
    this.Error = $('#error-template');
    this.ErrorWrapper = $('#error-wrapper');
    this.Button = $('#button');
    this.Weather = $('.weather');
    this.events();
  }

  headTemplate(feed) {
    let compile = Handlebars.compile(this.Head.html());
    let render = compile({ templateFeed: feed });
    this.HeadWrapper.html(render);
  }

  bodyTemplate(feed) {
    let compile = Handlebars.compile(this.Body.html());
    let render = compile({ templateFeed: feed.days });
    this.BodyWrapper.html(render);
    this.BodyFirstDiv.first().attr(
      'class',
      'col-sm-2 col-sm-offset-1 col-xs-10 col-xs-offset-1'
    );
  }

  errorTemplate(feed) {
    let compile = Handlebars.compile(this.Error.html());
    let render = compile(feed);
    this.ErrorWrapper.html(render);
  }

  events() {
    this.Button.click(this.generateData.bind(this));
    this.ErrorWrapper.click(this.clearError.bind(this));
  }

  clearError() {
    this.ErrorWrapper.attr('class', 'hide-error-msg');
  }

  generateData() {
    sendRequest($('#city').val(), 'GET')
      .then(response => {
        this.headTemplate(response);
        this.bodyTemplate(response);
        this.Weather.addClass('show-weather');
      })
      .catch(error => {
        this.errorTemplate({ templateFeed: error });
        this.ErrorWrapper.attr('class', 'show-error-msg');
        this.Weather.removeClass('show-weather');
        this.headTemplate({});
        this.bodyTemplate({});
      });
  }
}

export default GenerateTemplates;
