
export default inputEdit = () => {
    return (
        <Input
            placeholder={'Имя'}
            onChange={handleInputs}
            name={'name'}
            value={formData.name}
            error={false}
            isIcon={true}
            icon={'EditIcon'}
            errorText={'Ошибка'}
            size={'default'}
            disabled={true}
            onIconClick={handleInputClick}
        />
    )
}