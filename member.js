function skillsMember() {
    var member = {
        name: 'John Smith',
        age: 25,
        skills: ['JavaScript', 'React', 'Node', 'MongoDB'],
        bio: function () {
            console.log(this.name + ' is ' + this.age + ' years old and knows ' + this.skills.join(', '));
        }
    };
    return member;
}