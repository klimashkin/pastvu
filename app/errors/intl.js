export default {
    DENY: 'You do not have permission for this action',

    BAD_PARAMS: 'Invalid request parameters',
    BAD_BROWSER: 'Bad browser, we do not support it',

    SESSION_CAN_REGET_REGISTERED_ONLY: 'Error while selecting users',
    SESSION_EXPIRED_ARCHIVE_NO_RESULT: 'Archive sessions error',
    SESSION_NO_HEADERS: 'Bad request - no header or user agent',
    SESSION_NOT_FOUND: 'Session was not found',

    TIMEOUT: 'Waiting time was exceeded',
    UNHANDLED_ERROR: 'Error occurred on server',
    COUNTER_ERROR: 'Error occurred on server',

    NOTICE: 'Notice',

    NOT_FOUND: 'Resource was not found',
    NOT_FOUND_USER: 'User was not found',
    NO_SUCH_METHOD: 'Requested method does not exist',
    NO_SUCH_RESOURCE: 'Resource was not found',
    NO_SUCH_PHOTO: 'Requested photo does not exist or it is not available to you',
    NO_SUCH_USER: 'Requested user does not exist',
    NO_SUCH_REGION: 'Requested region does not exist',
    NO_SUCH_REGIONS: 'Requested regions don\'t exist',
    NO_SUCH_NEWS: 'Requested news does not exist',

    INPUT: 'Input error',
    INPUT_FIELD_REQUIRED: 'Required input field',
    INPUT_LOGIN_REQUIRED: 'Fill in the username',
    INPUT_LOGIN_CONSTRAINT: 'Имя пользователя должно содержать от 3 до 15 латинских символов и начинаться с буквы. ' +
    'В состав слова могут входить цифры, точка, подчеркивание и тире',
    INPUT_PASS_REQUIRED: 'Введите пароль',
    INPUT_EMAIL_REQUIRED: 'Введите адрес email',

    AUTHENTICATION: 'Authentication error',
    AUTHENTICATION_REGISTRATION: 'Authentication error',
    AUTHENTICATION_PASSCHANGE: 'Password change error',
    AUTHENTICATION_DOESNT_MATCH: 'Wrong login or password',
    AUTHENTICATION_MAX_ATTEMPTS: 'Your account has been suspended due to exceeding the number of failed attempts',
    AUTHENTICATION_PASS_WRONG: 'Wrong password',
    AUTHENTICATION_CURRPASS_WRONG: 'Wrong current password',
    AUTHENTICATION_PASSWORDS_DONT_MATCH: 'Passwords do not match',
    AUTHENTICATION_USER_EXISTS: 'This user name is already registered',
    AUTHENTICATION_USER_DOESNT_EXISTS: 'User with such password or e-mail does not exist',
    AUTHENTICATION_EMAIL_EXISTS: 'User with this email is already registered',
    AUTHENTICATION_KEY_DOESNT_EXISTS: 'The key you passed does not exist',

    PHOTO_CHANGED: 'From the moment you had got the page, the information on it has been altered by someone',
    PHOTO_NEED_REASON: 'You must specify the reason for the operation',
    PHOTO_NEED_COORD: 'The photo must have coordinates or be tied to the region manually',
    PHOTO_NEED_TITLE: 'You must fill in the name of the photo',
    PHOTO_ANOTHER_STATUS: 'Photo is already in other status, refresh the page',
    PHOTO_YEARS_CONSTRAINT: 'Published photos must be in the range of 1826-2000',
    PHOTO_CONVERT_PROCEEDING: 'You have already sent a request and it is still running. try later',

    REGION_ASSIGN_OBJECTS: 'Ошибка пересчета принадлежности обектов регионам',
    REGION_PARENT_THE_SAME: 'Вы пытаетесь указать родителем его самого',
    REGION_PARENT_DOESNT_EXISTS: 'Указанного родительского региона не существует',
    REGION_NO_RELATIVES: 'Регионы не должны быть вложенными друг в друга',
    REGION_PARENT_LOOP: 'Вы указали родителя, который уже имеет текущий регион в качестве родителя',
    REGION_GEOJSON_PARSE: 'Ошибка парсинга GeoJSON',
    REGION_GEOJSON_GEOMETRY: 'Неверная геометрия GeoJSON',
    REGION_MOVE_EXCEED_MAX_LEVEL: 'После перемещения региона он или его потомки окажутся ниже максимального 6-го уровня',
    REGION_SAVED_BUT_INCL_PHOTO: 'Сохранено, но возникла ошибка во время пересчета входящих фотографий',
    REGION_SAVED_BUT_PARENT_EXTERNALITY: 'Сохранено, но возникла ошибка во время пересчета родительских зависимостей',
    REGION_SAVED_BUT_REFILL_CACHE: 'Сохранено, но возникла ошибка во время пересчета кэша регионов. Рекоммендуется перезагрузка сервера',
    REGION_SELECT_LIMIT: 'Вы можете выбрать до 5 регионов',

    COMMENT_NO_OBJECT: 'Commented object does not exist or moderators changed it status, which is not available to you',
    COMMENT_NOT_ALLOWED: 'Operations with the comments on this page are forbidden',
    COMMENT_DOESNT_EXISTS: 'Comment does not exist',
    COMMENT_WRONG_PARENT: 'Что-то не так с родительским комментарием. Возможно он был удален. Пожалуйста, обновите страницу',
    COMMENT_TOO_LONG: 'Комментарий длиннее допустимого значения (12000)',
    COMMENT_UNKNOWN_USER: 'Неизвестный пользователь в комментариях',

    ADMIN_CANT_CHANGE_HIS_ROLE: 'Администратор не может менять свою роль :)',
    ADMIN_SUPER_CANT_BE_ASSIGNED: 'Суперадминистратор не может быть назначен через интерфейс управления пользователями',
    ADMIN_ONLY_SUPER_CAN_ASSIGN: 'Только суперадминистратор может назначать администраторов',

    CONVERT_PHOTOS_ALL: 'Error sending for conversion',
    CONVERT_PROMISE_GENERATOR: 'Ошибка выполнения операции в конвейере конвертации',

    HISTORY_DOESNT_EXISTS: 'The are no history for this object',

    SETTING_DOESNT_EXISTS: 'Such setting does not exist',

    MAIL_SEND: 'Error sending mail',
    MAIL_WRONG: 'Wrong email, check it one more time',
    MAIL_IN_USE: 'This email is already in use by another user'
};