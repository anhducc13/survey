/* eslint-disable lines-between-class-members */
/* eslint-disable prefer-const */
/* eslint-disable react/sort-comp */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import * as SurveyJSCreator from 'survey-creator';
import * as SurveyKo from 'survey-knockout';
import 'survey-creator/survey-creator.css';

import 'jquery-ui/themes/base/all.css';
import 'nouislider/distribute/nouislider.css';
import 'select2/dist/css/select2.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';

import 'jquery-bar-rating/dist/themes/css-stars.css';
import 'jquery-bar-rating/dist/themes/fontawesome-stars.css';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker.js';
import 'select2/dist/js/select2.js';
import 'jquery-bar-rating';

import 'icheck/skins/square/blue.css';

import * as widgets from 'surveyjs-widgets';

SurveyJSCreator.StylesManager.applyTheme('darkblue');

widgets.icheck(SurveyKo, $);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

const options = {
  showEmbededSurveyTab: false,
  showJSONEditorTab: false,
  isAutoSave: false,
  questionTypes: ['text', 'checkbox', 'radiogroup', 'dropdown'],
};

export const useSurvey = ({ name, defaultValue = null, onSaveSurvey }) => {
  let surveyCreator;

  const handleSaveSurvey = () => {
    onSaveSurvey(surveyCreator.text);
  };

  const initSurvey = () => {
    surveyCreator = new SurveyJSCreator.SurveyCreator(name, options);
    if (!defaultValue) {
      surveyCreator.text = defaultValue;
    }
    surveyCreator.saveSurveyFunc = handleSaveSurvey;
  };

  return {
    surveyCreator,
    initSurvey,
  };
};
