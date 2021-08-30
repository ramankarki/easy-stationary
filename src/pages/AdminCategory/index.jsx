import { connect } from 'react-redux';

import {
  UI_CATEGORY_STATE,
  APP_CATEGORY_STATE,
  CATEGORY,
} from '../../actions/constants';
import onRead from '../../actions/onRead';
import onCreate from '../../actions/onCreate';
import onDelete from '../../actions/onDelete';
import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
import fields from '../../utils/fields';
import appState from '../../appState';
import triggerCriticalModal from '../../utils/triggerCriticalModal';

import AdminPageTemplate from '../../templates/AdminPageTemplate';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

import './adminCategory.scss';

function AdminCategory(props) {
  const { categories } = props;

  injectReducer(
    UI_CATEGORY_STATE,
    HOFreducer(UI_CATEGORY_STATE, fields('Add new category'))
  );
  injectReducer(
    APP_CATEGORY_STATE,
    HOFreducer(APP_CATEGORY_STATE, appState(APP_CATEGORY_STATE))
  );
  injectReducer(
    CATEGORY,
    HOFdomainReducer(CATEGORY, 'categories', 'category', 'categoryName')
  );

  if (!categories) props.onRead(APP_CATEGORY_STATE);

  // event handlers
  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onCreate(APP_CATEGORY_STATE, UI_CATEGORY_STATE);
  };

  const onCategoryDelete = (deleteObj, categoryName) => () =>
    props.onDelete(APP_CATEGORY_STATE, deleteObj, categoryName);

  return (
    <AdminPageTemplate
      {...props}
      heading="Category"
      APP_STATE={APP_CATEGORY_STATE}
    >
      <div className="category">
        <form onSubmit={onSubmitHandler} className="category__form">
          <InputField
            labelName="Add new category"
            placeholder="Add new category"
            hideLabel={true}
            TYPE={UI_CATEGORY_STATE}
            dbProp={'categoryName'}
          />
          <Button value="Add new category" small="true" />
        </form>

        <div className="category__categories">
          {categories?.map((category) => (
            <div className="categoryBox">
              {category.categoryName} ({category.noOfProducts})
              <button
                onClick={triggerCriticalModal(
                  null,
                  'Delete category',
                  `Type '${category.categoryName}', to delete this category.`,
                  onCategoryDelete(category, category.categoryName)
                )}
              >
                <img src="/assets/exit icon.svg" alt="exit icon" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminPageTemplate>
  );
}

const mapStateToProps = ({ APP_CATEGORY_STATE, CATEGORY }) => ({
  ...APP_CATEGORY_STATE,
  ...CATEGORY,
});

export default connect(mapStateToProps, { onRead, onCreate, onDelete })(
  AdminCategory
);
