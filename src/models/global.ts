type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type LangType = 'ru' | 'en';

type Themes = 'light' | 'dark';

type AuthModal = 'signIn' | 'signUp' | '';

type SortTypes =
    | 'fromAtoZ'
    | 'fromZtoA'
    | 'fromNewToOld'
    | 'fromOldToNew'
    | 'fromMoreToLess'
    | 'fromLessToMore'
    | '';

type CustomFieldTypes = 'number' | 'string' | 'text' | 'date' | 'checkbox' | '';

type ImageType = 'beam' | 'marble';

type ChangedCommentType = 'newComment' | 'deletedComment';

export type {
    SetState,
    Themes,
    AuthModal,
    SortTypes,
    CustomFieldTypes,
    ImageType,
    ChangedCommentType,
};
