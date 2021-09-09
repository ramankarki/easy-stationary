import { connect } from 'react-redux';
import { useEffect } from 'react';

import {
  UI_CATEGORY_STATE,
  APP_CATEGORY_STATE,
  CATEGORY,
} from '../../actions/constants';
import onGet from '../../actions/onGet';
import onPost from '../../actions/onPost';
import onDelete from '../../actions/onDelete';
import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
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

  useEffect(() => {
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

    props.onGet(APP_CATEGORY_STATE);

    return () => {
      ejectReducer(CATEGORY);
      ejectReducer(UI_CATEGORY_STATE);
      ejectReducer(APP_CATEGORY_STATE);
    };
  }, []);

  // event handlers
  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onPost(APP_CATEGORY_STATE, UI_CATEGORY_STATE);
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
            <div key={category.categoryName} className="categoryBox">
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

export default connect(mapStateToProps, { onGet, onPost, onDelete })(
  AdminCategory
);
