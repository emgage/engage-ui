import * as React from 'react';
import { Picker, PickerProps, Button } from './../../components';
import { debounce } from 'lodash';

const incrementSize = 10;
const initialSize = 10;

interface IResult {
  pageCount: number;
  currentPage: number;
}

interface ILazyPickerProps {
  pickerProps: PickerProps;
  getAll: any;
}

const LazyPicker = (props: ILazyPickerProps) => {

  const [searchString, setSearchString] = React.useState<string | undefined>();
  const [fetchingCount, setFetchingCount] = React.useState<number>(0);
  const [isShowMore, toggleShowMore] = React.useState<boolean>(true);
  const [size, setSize] = React.useState<number>(initialSize);
  const { pickerProps, getAll } = props;
  const { source = [], defaultSelectedItems = [], loading, shouldRenderSuggestions, onSelect, shouldFilterSuggestions = false } = pickerProps;

  const ids = React.useMemo(() => defaultSelectedItems.map((item: any) => item.id), [defaultSelectedItems]);
  const filteredSource = React.useMemo(() => source.filter((item: any) => !ids.includes(item.id)), [ids, source]);

  const handleShowMore = () => {
    setSize(prevSize => prevSize + incrementSize);
  };

  const moreInfoComponent = !loading && fetchingCount <= 0 && isShowMore && <Button plain componentSize="slim" onClick={handleShowMore}> Load More.. </Button>;

  React.useEffect(() => {
    if (shouldRenderSuggestions) {
      fetchFunction('initial');
    }
  },              []);

  React.useEffect(() => {
    if (initialSize !== size) {
      fetchFunction('size');
    }
  },              [size]);

  const lazySearch = debounce(
    (value: string, method: string) => {
      setSearchString(value);
      if (method === 'type') {
        fetchFunction('search', value);
      }
    // tslint:disable-next-line
    }, 500);

  const fetchFunction = (type: string = '', searchVal = searchString) => {
    let newSize = size;
    if (['initial', 'search', 'focus'].includes(type)) {
      newSize = initialSize;
      if (size !== initialSize) {
        setSize(initialSize);
      }
    }
    setFetchingCount(prevCount => prevCount + 1);
    getAll({ searchString: searchVal, size: newSize, selectedIds: ids }, type).then((data: IResult) => {
      const { pageCount = 1, currentPage = 1 } = data;
      setFetchingCount((prevCount: number) => {
        const newCount = prevCount - 1;
        if (newCount === 0) {
          toggleShowMore(pageCount > currentPage);
        }
        return newCount;
      });
    }).catch(() => {
      setFetchingCount((prevCount: number) => {
        const newCount = prevCount - 1;
        if (newCount === 0) {
          toggleShowMore(false);
        }
        return newCount;
      });
    });
  };

  const handleSelect = (item: any) => {
    onSelect && onSelect(item);
    if (fetchingCount <= 0) {
      toggleShowMore(false);
    } else {
      const interval = setInterval(() => {
        setFetchingCount((prevCount: number) => {
          if (prevCount <= 0) {
            toggleShowMore(false);
            clearInterval(interval);
          }
          return prevCount;
        });
      },                           500);
    }
  };

  const onFocus = () => {
    if ((searchString === '' && source.length === 0) || (searchString !== '')) {
      if (shouldRenderSuggestions) {
        fetchFunction('focus', '');
      }
    }
    setSearchString('');
  };

  return <Picker {...pickerProps}
    onSelect={handleSelect}
    source={filteredSource}
    moreInfoComponent={moreInfoComponent}
    loading={loading || fetchingCount > 0}
    onFocus={onFocus}
    searchBehavior={lazySearch}
    shouldFilterSuggestions={shouldFilterSuggestions}
  />;
};

export default LazyPicker;
