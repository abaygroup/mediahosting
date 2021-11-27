import React from 'react';
import useTranslation from "next-translate/useTranslation";

const SearchForm = () => {
    const { t } = useTranslation();

    return (
        <div className="search-form">
            <form action="">
                <input type="text" placeholder={t("common:category.input")} />
            </form>
        </div>
    )
}

export default SearchForm;